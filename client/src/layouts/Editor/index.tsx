import React, {Component, DOMElement, RefObject} from 'react';
import ReactDOM from 'react-dom';
import Blockly from '../../blockly/blockly';
import { IpcRenderer, AllElectron } from 'electron';
import { saveAs } from 'file-saver';

import { toolbox } from '../../assets/xmls.js';
import EditorHeader from './components/EditorHeader';
import * as Modal from '../../components/Modal';
import EditorPopup from './components/EditorPopup';
import EditorPopupHeader from './components/EditorPopupHeader';
import Monaco from './components/Monaco';
import BlocklyEditor from '../../components/BlocklyEditor';
import Toolbox from '../../components/Toolbox';
import Prompt from '../../components/Modal/Prompt';
import Notification, { NotificationWrapper } from '../../components/Notification';
import Serial from "./components/Serial";
import {Devices, Sketch} from "../Home/index";
import Toolboxes from "../../components/BlocklyToolbox/Toolbox";
import MonacoRO from "./components/MonacoRO";
import {SaveModal} from "../Home/components/SaveModal";

const StartSketches: { [name: string]: { block: string, code: string } } = {};

StartSketches["cm:esp32:ringo"] = {
  block: `<xml xmlns="http://www.w3.org/1999/xhtml"><block type="arduino_functions" id="a2?I/d{0K_Umf.d2k4D0" x="40" y="50"></block></xml>`,
  code: `#include <MAKERphone.h>

MAKERphone mp;

void setup() {
  mp.begin(1);
  mp.display.fillScreen(TFT_BLACK);
}

void loop() {
  mp.update();
  
}`
};

StartSketches["cm:esp8266:nibble"] = {
  block: `<xml xmlns="http://www.w3.org/1999/xhtml"><block type="arduino_functions" id="a2?I/d{0K_Umf.d2k4D0" x="40" y="50"></block></xml>`,
  code: `#include <Arduino.h>

void setup() {
  
}

void loop() {
  
}`
};

StartSketches["cm:esp32:spencer"] = StartSketches["cm:esp8266:nibble"];

const sanitizeName = (name: string) => name.replace(/ /g, '_').replace(/\./g, '');

export enum SketchType { BLOCK, CODE }

export interface SketchLoadInfo {
  data: string;
  type: SketchType;
  device: string;
}

interface EditorProps {
  isEditorOpen: boolean;
  openHome: () => void;
  title: string;
  setFilename: (filename: string) => void;
  monacoRef: React.RefObject<any>;
  reportError: (error: string, fatal?: boolean) => void;
  device: string;
}

interface State {
  isModalOpen: boolean;
  modal: {
    type: 'save' | 'load';
    data?: any;
  };
  serial: string;
  isSerialOpen: boolean;
  isCodeOpen: boolean;
  isCodeFull: boolean;
  width?: number;
  height?: number;
  theme: 'vs-light' | 'vs-dark';
  initState?: string;
  isPromptOpen?: boolean;
  promptText?: string;
  runningStage?: string;
  running: boolean;
  notifications: Notification[];
  makerPhoneConnected: boolean;
  filename: string;
  filenames?: string[];
  filenameError?: string;
  xml?: string;
  type: SketchType;
  code: string;
  minimalCompile: boolean;
  startCode: string;
  codeDidChange?: boolean;
  isExitEditor: boolean;
  isExitEditorOption: string;
  isInitialLoad: boolean;
  isIgnoreNaming: boolean;
  defaultCode: string;
}

const NAV_BAR_HEIGHT = 64;

const INIT_STATE: State = {
  isModalOpen: false,
  modal: {
    type: 'save'
  },
  isCodeOpen: true,
  isCodeFull: false,
  height: window.innerHeight - NAV_BAR_HEIGHT,
  theme: 'vs-dark',
  notifications: [],
  makerPhoneConnected: false,
  filename: '',
  running: false,
  serial: '',
  isSerialOpen: false,
  type: SketchType.BLOCK,
  code: "",
  minimalCompile: true,
  startCode: "",
  codeDidChange: false,
  isExitEditor: false,
  isExitEditorOption: "",
  isInitialLoad: false,
  isIgnoreNaming: false,
  defaultCode: "",
};

interface Notification {
  id: string;
  message: string;
  icon?: string;
  close?: boolean;
}

const electron: AllElectron = (window as any).require('electron');
const ipcRenderer: IpcRenderer = electron.ipcRenderer;
const { dialog } = electron.remote;

class Editor extends Component<EditorProps, State> {
  blocklyDiv: any = undefined;
  workspace: any = undefined;
  callback: (value: string) => void = () => {};

  constructor(props: EditorProps) {
    super(props);
    this.handleKeyboardSave = this.handleKeyboardSave.bind(this);

    this.state = {
      ...INIT_STATE
    };

    this.updateDimensions = this.updateDimensions.bind(this);

    ipcRenderer.on('ports', (event: any, args: any) => {
      const { port } = args;
      const { device } = this.props;

      if(port && !this.state.makerPhoneConnected){
        this.addNotification(`${Devices[device].name} connected`);
        this.setState({ makerPhoneConnected: true });
      }else if(!port && this.state.makerPhoneConnected){
        this.addNotification(`${Devices[device].name} disconnected`);
        this.setState({ makerPhoneConnected: false });
      }
    });

    ipcRenderer.on("runprogress", (event: any, args: any) => {
      if(args.stage == "DONE" && args.running){
        this.setState({ running: true });
        return;
      }

      if(!this.state.running) return;

      if(args.cancel){
        this.addNotification("Run operation cancelled.");
      }

      if(args.stage == "DONE"){
        this.setState({ running: false, runningStage: undefined});
        return;
      }

      if(this.state.runningStage != args.stage){
        this.setState({ runningStage: args.stage })
      }
    });
  }

  handleKeyboardSave(e: any){
    console.log(e);
    if((e.keyCode === 83) && (e.ctrlKey === true)){
      console.log(this);
        if(!this.props.title){
          this.openSaveModal();
        } else {
          this.save();
        }
     }
  }
  getCode(){
    let code: string;

    if(this.state.type == SketchType.CODE){
      if(this.props.monacoRef == undefined || this.props.monacoRef.current == null) return "";

      code = this.props.monacoRef.current.getCode();
    }else{
      if(!this.workspace) return "";
      // @ts-ignore
      code = Blockly.Arduino.workspaceToCode(this.workspace);
    }

    //this.setState({ code });
    return code;
  }

  updateDimensions() {
    const { innerWidth, innerHeight } = window;
    this.setState({
      width: innerWidth,
      height: innerHeight - NAV_BAR_HEIGHT
    });

    Blockly.svgResize(this.workspace);
  }

  componentDidMount() {

    Blockly.prompt = (a, b, c) => {
      const initState = a.split("'")[1];
      this.callback = c;
      this.setState({ initState: initState, isPromptOpen: true, promptText: a });
    };

    (window as any).Blockly = Blockly;
    this.workspace = Blockly.inject(this.blocklyDiv, { toolbox: toolbox, trashcan: false, zoom: { wheel: true, controls: true } });
    this.workspace.addChangeListener((e: any) => {
      // @ts-ignore
      const code = Blockly.Arduino.workspaceToCode(this.workspace);
      console.log(this.state.codeDidChange);
      this.setState({ code});

      this.setState({ codeDidChange: true});
    });

    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
    window.addEventListener('keydown', this.handleKeyboardSave, false);

    ipcRenderer.send('ports');
  }



  componentWillUpdate(nextProps: Readonly<EditorProps>, nextState: Readonly<State>, nextContext: any): void {
    let stateUpdate: any = {};
    if(this.props.isEditorOpen && !nextProps.isEditorOpen){
      this.setState({ isSerialOpen: false });
    }
  }


  injectToolbox(device: string) {
    const blockly = ReactDOM.findDOMNode(this.blocklyDiv) as Element;
    const blocklyToolboxDiv = blockly.getElementsByClassName('blocklyToolboxDiv')[0];
    ReactDOM.unmountComponentAtNode(blocklyToolboxDiv);


    const blocklyToolbox = (
      <div className="blocklyToolbox">
        <Toolbox editorname="blocks" blockly={Blockly} categories={Toolboxes[device]()} />
      </div>
    );

    ReactDOM.render(blocklyToolbox, blocklyToolboxDiv);
  }

  componentWillUnmount() {
    this.resetStateOnExit();
    window.removeEventListener('resize', this.updateDimensions);
    window.removeEventListener('keydown', this.handleKeyboardSave);
  }

  run = () => {
    if(this.state.running){
      ipcRenderer.send('stop', { code: this.getCode(), minimal: this.state.minimalCompile });
    }else{
      this.setState({ running: true });
      ipcRenderer.send('run', { code: this.getCode(), device: this.props.device, minimal: this.state.minimalCompile });}
  };

  openLoadModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeNotification = (id: string) => () => {
    this.setState((oldState) => {
      const newNotifications = oldState.notifications.map((item) =>
        item.id !== id ? item : { ...item, close: true }
      );

      setTimeout(() => {
        this.setState((oldState) => {
          const removeNotifications = oldState.notifications.filter((item) => item.id !== id);
          return { notifications: removeNotifications };
        });
      }, 500);

      return { notifications: newNotifications };
    });
  };

  addNotification = (message: string, time: number = 2000) => {
    const notification: Notification = {
      message,
      id: new Date().getTime().toString()
    };
    this.setState({ notifications: [...this.state.notifications, notification] });

    if (time !== -1) {
      setTimeout(this.closeNotification(notification.id), time);
    }
  };

  load = (sketch: SketchLoadInfo) => {
    const Name: { [name: string]: string } = {
      "cm:esp32:ringo": "MAKERphone",
      "cm:esp8266:nibble": "Nibble",
      "cm:esp32:spencer": "Spencer"
    }

    Blockly.Device = Name[sketch.device];
    this.setState({defaultCode: StartSketches[sketch.device].code})

    if(sketch.type == SketchType.CODE){
      let startCode: string;

      if(sketch.data === ""){
        startCode = StartSketches[sketch.device].code;
        if(this.props.title === ""){
          this.setState({isModalOpen: true});
        }
      }else{
        startCode = sketch.data;
      }
      console.log(sketch.data);
      this.setState({ code: startCode, type: sketch.type, startCode: startCode });
    }else{
      if(sketch.data === "") {
        sketch.data = StartSketches[sketch.device].block;
        if(this.props.title === ""){
          this.setState({isModalOpen: true});
        }

      }
      const xml = Blockly.Xml.textToDom(sketch.data);
      this.workspace.clear();
      Blockly.Xml.domToWorkspace(xml, this.workspace);
      this.injectToolbox(sketch.device);

      this.setState({ type: sketch.type });
      console.log(this.workspace, xml);
      setTimeout(() => this.setState({codeDidChange: false}), 1250)
    }
  };

  private onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e.key)
  }

  private generateSketch(): string {
    const xmlDom = Blockly.Xml.workspaceToDom(this.workspace) as unknown as Element;

    const node = this.workspace.getCanvas().cloneNode(true);
    node.removeAttribute("transform");
    node.firstChild.removeAttribute("transform");

    const snapshot = document.createElement("snapshot");
    snapshot.appendChild(node);

    const device = document.createElement("device");
    device.innerText = this.props.device;

    xmlDom.prepend(snapshot);
    xmlDom.prepend(device);

    return Blockly.Xml.domToText(xmlDom);
  }

  save = () => {
    ipcRenderer.once('save', (event, arg) => {
      if(arg.error) {
        this.props.reportError(arg.error);
      }else{
        this.addNotification("Sketch saved.");
      }
    });

    let data: string | undefined;
    if(this.state.type == SketchType.BLOCK){
      data = this.generateSketch();
    }else{
      data = this.getCode();
    }

    ipcRenderer.send('save', { title: this.props.title, data, type: this.state.type, device: this.props.device });
    if(this.state.isExitEditor === true){
      this.setState({isExitEditor: false});
      this.props.openHome();
    }else {this.setState({isExitEditor: false});}

  };

  onSubmitSaveModal = (e?: React.FormEvent<HTMLFormElement>) => {
    const filename = sanitizeName(this.state.filename);
    e && e.preventDefault();

    ipcRenderer.once('save', (event, arg) => {
      if(arg.error) {
        this.props.reportError(arg.error);
      } else {
        this.props.setFilename(filename);
        this.finishSaveModal();
        this.addNotification("Sketch saved.");
      }
    });

    let data: string | undefined;
    if(this.state.type == SketchType.BLOCK){
      data = this.generateSketch();
    }else{
      data = this.getCode();
    }

    ipcRenderer.send('save', { title: filename, data, type: this.state.type, device: this.props.device });
    /*if(this.state.isExitEditor === true){
      this.props.openHome();
    }*/
    this.setState({isExitEditor: false});
  };

  resetStateOnExit = () => {
    this.setState({
      codeDidChange: false,
      isExitEditor: false,
      isExitEditorOption: "",
      isModalOpen: false,
      isIgnoreNaming: false,
    })
  }

  getSketches(){
    ipcRenderer.once('sketches', (event, arg) => {
      if (!arg.sketches) return;
      const relevantSketches = this.state.type == SketchType.BLOCK ? arg.sketches.block : arg.sketches.code;
      const filenames = relevantSketches.map((sketch: Sketch) => sketch.title);
      this.setState({filenames});
    });

    ipcRenderer.send('sketches');

    if(this.state.isModalOpen){
      this.setState({
        filename: '',
        filenameError: 'EMPTY'
      });
    } else {
      this.setState({
        isModalOpen: true,
        modal: {
          type: 'save'
        },
        filename: '',
        filenameError: 'EMPTY'
      });
    }

  }

  openSaveModal = (option?: string) => {
    if (this.state.type == SketchType.BLOCK && this.workspace.getAllBlocks().length === 0) {
      this.props.reportError("You can't save an empty sketch.");
      return;
    }

    this.getSketches();

    if(option === "saveAndExit"){
      if(this.props.title !== ""){
        this.resetStateOnExit();
        this.props.openHome();
      }
    }
  };

  exportBinary = () => {
    const path = dialog.showSaveDialogSync({});
    if(path == undefined) return;

    this.setState({ running: true});
    console.log("Exporting for ", this.props.device);
    ipcRenderer.send('export', { code: this.getCode(), path, device: this.props.device ? this.props.device : "cm:esp32:ringo", minimal: this.state.minimalCompile });
  };

  saveExternal = () => {
    if (this.state.xml) {
      const blob = new Blob([this.state.xml], {
        type: 'application/xml;charset=utf-8'
      });
      saveAs(blob, 'filename.xml');
    }
    this.finishSaveModal();
  };

  toggle = () => {
    this.setState({ isCodeOpen: !this.state.isCodeOpen });
    this.updateDimensions();
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  closeCode = () => {
    this.state.isCodeOpen && this.toggle();
  };

  fullScreenToggle = () => {
    this.setState({ isCodeFull: !this.state.isCodeFull });
  };

  setRef = (ref: any) => {
    this.blocklyDiv = ref;
  };

  toggleTheme = () => {
    this.setState({ theme: this.state.theme === 'vs-dark' ? 'vs-light' : 'vs-dark' });
  };

  closePrompt = () => {
    this.setState({ isPromptOpen: false });
  };

  saveAndExit = (option?: string) => {
    if(this.state.codeDidChange === true){
      this.setState({isExitEditor: true});
      switch(option){
        case "saveAndExit":
          if(this.props.title === ""){
            this.openSaveModal(option);
            this.setState({isExitEditor: false});
            option = "";
            break;
          } else if (this.props.title !== "") {
            this.save();
            this.resetStateOnExit();
            this.props.openHome();
            break;
          }
        case "exit":{
          this.props.openHome();
          this.resetStateOnExit();
          break;
        }

        case "cancel":
          this.setState({isExitEditor: false});
          console.log(this.state.codeDidChange)
          break;
      }

    } else {
      this.resetStateOnExit();
      this.props.openHome();

    }
  }

  onChangeSaveModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filename = e.target.value;
    if(!this.state.filenames){
      this.getSketches();
    }
    const newState: { filename: string; filenameError: string | undefined } = {
      filename,
      filenameError: undefined
    };

    if (filename.length === 0) {
      newState['filenameError'] = 'EMPTY';
    } else if (this.state.filenames && this.state.filenames.includes(filename)) {
      newState['filenameError'] = 'EXISTS';
    }

    console.log(newState);

    this.setState(newState);
  };

  exitMonacoEditor(option: boolean){
    this.setState({codeDidChange: option});
  }
  finishSaveModal = () => {
    this.setState({
      isModalOpen: false,
      filename: '',
      filenameError: undefined
    });
  };

  cleanup = () => {
    Blockly.hideChaff();
  };

  render() {
    const {
      isModalOpen,
      modal,
      isCodeOpen,
      isCodeFull,
      height,
      width,
      theme,
      isPromptOpen,
      initState,
      promptText,
      runningStage,
      notifications,
      makerPhoneConnected,
      filename,
      filenameError,
      serial,
      isSerialOpen,
      type,
      minimalCompile,
      startCode
    } = this.state;
    const { isEditorOpen, openHome, title, monacoRef, device } = this.props;

    const stateCode = this.state.code;
    let code: string = stateCode;

    if(type == SketchType.CODE){
      code = this.getCode();
    }

    const footer = {
      left: [{ text: 'Save externally', onClick: this.saveExternal }],
      right: [
        { text: 'Cancel', onClick: this.closeModal },
        { text: 'Save', onClick: this.save, color: 'blue' },
        { text: 'Save', onClick: this.save, color: 'blue', disabled: true }
      ]
    };

    const saveFooter = {
      left: [{ text: 'Save externally', onClick: this.saveExternal }],
      right: [
        { text: 'Cancel', onClick: this.closeModal },
        {
          text: 'Save',
          onClick: this.onSubmitSaveModal,
          color: 'blue',
          disabled: this.state.filenameError !== undefined
        }
      ]
    };

    const modalProps = {
      footer: modal.type === 'save' ? saveFooter : footer,
      title: 'Modal title',
      close: this.closeModal
    };

    return (

      <div className={isEditorOpen ? 'e-open' : 'e-close'} style={{ backgroundColor: '#F9F9F9' }} >
        {isEditorOpen && (
          <React.Fragment>
            {isModalOpen &&
              (modal.type === 'save' ? (
                <Modal.SaveModal
                  {...modalProps}
                  filename={filename}
                  filenameError={filenameError}
                  onChange={this.onChangeSaveModal}
                  onSubmit={ this.onSubmitSaveModal}

                />
              ) : (
                null
              ))}

            {isPromptOpen && (
              <Prompt
                initValue={initState || ''}
                callback={this.callback}
                promptText={promptText || ''}
                closePrompt={this.closePrompt}
              />
            )}
              <SaveModal open={this.state.isExitEditor} closeModalCallback={option => this.saveAndExit(option)}/>
            <EditorHeader
              home={this.saveAndExit}
              load={this.openLoadModal}
              run={this.run}
              save={this.props.title.length > 0 ? this.save : this.openSaveModal}
              toggle={this.toggle}
              title={title}
              isCodeOpen={isCodeOpen}
              isSerialOpen={isSerialOpen}
              openSerial={() => this.setState({isSerialOpen: !this.state.isSerialOpen})}
              connected={makerPhoneConnected}
              exportBinary={this.exportBinary}
              codeButton={type == SketchType.BLOCK}
              minimalCompile={minimalCompile}
              device={device}
              toggleMinimal={() => { this.setState({ minimalCompile: !minimalCompile }) }}
            />

            {notifications && (
              <NotificationWrapper>
                {notifications.map((item) => (
                  <Notification key={item.id} {...item} onClick={this.closeNotification(item.id)} />
                ))}
              </NotificationWrapper>
            )}
          </React.Fragment>
        )}

        <BlocklyEditor
          running={this.state.running}
          runStage={this.state.runningStage}
          height={height}
          width={width}
          isCodeOpen={isCodeOpen}
          setRef={this.setRef}
          ws={this.workspace}
          disabled={type == SketchType.CODE}
        />

        <Serial connected={this.state.makerPhoneConnected && runningStage != "UPLOAD"} isOpen={isSerialOpen} />

        {isCodeOpen && isEditorOpen && (
          <EditorPopup className={(isCodeFull || type == SketchType.CODE) ? 'fullscreen' : ''} theme={theme}>
            <EditorPopupHeader
              closeCode={this.closeCode}
              fullScreenToggle={this.fullScreenToggle}
              toggleTheme={this.toggleTheme}
              theme={theme}
              extendedHeader={type == SketchType.BLOCK}
            />
            { (type == SketchType.CODE) && <Monaco isNewFile={() => this.setState({isModalOpen: true})} ref={monacoRef} startCode={startCode} theme={theme} editing={true} exitEditor={(option) => this.exitMonacoEditor(option)} defaultCode={this.state.defaultCode}/> || <MonacoRO code={code} theme={theme} /> }
          </EditorPopup>
        )}
      </div>
    )
  }
}

export default Editor;
