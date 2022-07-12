import * as alt from 'alt-client';
import { KeybindController } from '../../../../client/events/keyup';
import { WebViewController } from '../../../../client/extensions/view2';
import ViewModel from '../../../../client/models/viewModel';
import { KEY_BINDS } from '../../../../shared/enums/keyBinds';

const PAGE_NAME = 'DemoPhone';

let open = false;

//Dient dazu mit dem Handy zu laufen.
let onscreen = false;

let activeSimNumber = '';

export class GPPhone implements ViewModel {
    static init() {
        GPPhone.registerKeybinds();
        GPPhone.bootPhone();
    }

    /**
     * Register the keybind to the Keybind Controller.
     * Triggers opening the vue dialog.
     * @static
     */
    static registerKeybinds() {
        KeybindController.registerKeybind({ key: KEY_BINDS.PHONE, singlePress: GPPhone.toggle });
    }

    /**
     * Boots the phone directly after connect
     * @static
     */
    static bootPhone() {
       
    }

    static setProp(prop: string, value: any) {
        WebViewController.emit("DemoPhone:SetProp", prop, value);
    }

    static setPropDial(prop: string, value: any) {
        
    }

    static async toggle(): Promise<void> {
        alt.logWarning('Toggle Phone');
        if (alt.Player.local.meta.inventory) {
            let phoneItem = alt.Player.local.meta.inventory.find((item) => item.name === 'Mobilephone');
            if (phoneItem) {
                if (!open && !onscreen) {
                    onscreen = true;
                    GPPhone.open();
                } else if (onscreen) {
                    onscreen = false;
                    GPPhone.closeButLeaveInHand();
                } else {
                    GPPhone.close();
                }
            } else {
                GPPhone.close();
            }
        }
    }

    static async open(): Promise<void> {
        alt.emit('objectAttacher:attachObjectAnimated', 'phone', false);
        open = true;
        WebViewController.openPages([PAGE_NAME]);
        WebViewController.on(View_Events_GPVoice_Phone.Ready, GPPhone.ready);
        WebViewController.on(View_Events_GPVoice_Phone.Close, GPPhone.close);

        WebViewController.on(View_Events_GPVoice_Phone_Dial.Ready, GPPhone.ready_Dial);
        WebViewController.on(View_Events_GPVoice_Phone_Dial.Call, GPPhone.phoneCall);
        WebViewController.on(View_Events_GPVoice_Phone_Dial.Accept, GPPhone.acceptCall);
        WebViewController.on(View_Events_GPVoice_Phone_Dial.Decline, GPPhone.declineCall);

        WebViewController.focus();
        WebViewController.showCursor(true);

        alt.toggleGameControls(false);
    }

    static ready() {}

    static async ready_Dial() {
        const view = await WebViewController.get();
        view.emit(View_Events_GPVoice_Phone_Dial.SetProp, 'activeSimNumber', activeSimNumber);
    }

    static activateSim(simNumber: string) {
        activeSimNumber = simNumber;
    }

    static unknown(message: string) {
        WebViewController.emit(View_Events_GPVoice_Phone_Dial.Unknown, message);
    }

    static ringing(callID: string, number: string, callerNumber: string) {
        WebViewController.emit(View_Events_GPVoice_Phone_Dial.Ringing, callID, number, callerNumber);
    }

    static incomingCall(callID: string, number: string, callerNumber: string) {
        WebViewController.emit(View_Events_GPVoice_Phone_Dial.Call, callID, number, callerNumber);
    }

    static phoneCall(callernumber: string, calleenumber: string) {
        alt.emitServer(View_Events_GPVoice_Phone.Call, callernumber, calleenumber);
    }

    static acceptCall(callID: string) {
        alt.emitServer(View_Events_GPVoice_Phone.Accept, callID);
    }

    static declineCall(callID: string) {
        alt.emitServer(View_Events_GPVoice_Phone.Decline, callID);
    }

    static closeButLeaveInHand() {
        alt.toggleGameControls(true);
        WebViewController.closePages([PAGE_NAME]);
        WebViewController.unfocus();
        WebViewController.showCursor(false);
    }

    static close() {
        alt.emit('objectAttacher:detachObject');
        open = false;
        alt.toggleGameControls(true);
        WebViewController.closePages([PAGE_NAME]);
        WebViewController.unfocus();
        WebViewController.showCursor(false);
    }
}
