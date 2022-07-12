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
        WebViewController.on("DemoPhone:Ready", GPPhone.ready);
        WebViewController.on("DemoPhone:Close", GPPhone.close);


        WebViewController.focus();
        WebViewController.showCursor(true);

        alt.toggleGameControls(false);
    }

    static ready() {}

    static async ready_Dial() {
       //to implement
    }

    static activateSim(simNumber: string) {
        activeSimNumber = simNumber;
    }

    static unknown(message: string) {
        //to implement
    }

    static ringing(callID: string, number: string, callerNumber: string) {
        //to implement
    }

    static incomingCall(callID: string, number: string, callerNumber: string) {
        //to implement
    }

    static phoneCall(callernumber: string, calleenumber: string) {
        //to implement
    }

    static acceptCall(callID: string) {
        //to implement
    }

    static declineCall(callID: string) {
        //to implement
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
