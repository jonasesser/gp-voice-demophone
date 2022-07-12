<template>
    <div class="">
        <div id="homeScreen">
            <div id="apps">
                <Button @click="openApp('mail', 'rgb(237, 237, 236)')" class="app">
                    <Icon icon="icon-mail1" class="appicon" />
                </Button>
                <Button @click="openApp('calendar', 'rgb(237, 237, 236)')" class="app">
                    <Icon icon="icon-calendar" class="appicon" />
                </Button>
                <Button @click="openApp('social', 'black')" class="app">
                    <Icon icon="icon-instagram2" class="appicon" />
                </Button>
                <Button @click="openApp('mail', 'black')" class="app">
                    <Icon icon="icon-mail1" class="appicon" />
                </Button>
                <Button @click="openApp('weather', 'black')" class="app">
                    <Icon icon="icon-wb_cloudy" class="appicon" />
                </Button>
                <Button @click="openApp('charge', 'black')" class="app">
                    <Icon icon="icon-battery1" class="appicon" />
                </Button>
                <Button @click="openApp('airmode', 'black')" class="app">
                    <Icon icon="icon-plane" class="appicon" />
                </Button>
                <Button @click="openApp('settings', 'black')" class="app">
                    <Icon icon="icon-settings" class="appicon" />
                </Button>
                <Button @click="openApp('calculator', 'black')" class="app">
                    <Icon icon="icon-calculator" class="appicon" />
                </Button>
                <Button @click="openApp('time', 'black')" class="app">
                    <Icon icon="icon-clock" class="appicon" />
                </Button>
            </div>
            <div id="fav">
                <Button @click="openApp('dial', 'black')" class="app">
                    <Icon icon="icon-call" class="favappicon" />
                </Button>
                <Button @click="openApp('contacts', 'rgb(237, 237, 236)')" class="app">
                    <Icon icon="icon-contacts" class="favappicon" />
                </Button>
                <Button @click="openApp('messages', 'black')" class="app">
                    <Icon icon="icon-message" class="favappicon" />
                </Button>
                <Button @click="openApp('gps', 'black')" class="app">
                    <Icon icon="icon-gps_fixed" class="favappicon" />
                </Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@components/Button.vue';
import Frame from '@components/Frame.vue';
import Icon from '@components/Icon.vue';
import Input from '@components/Input.vue';
import Modal from '@components/Modal.vue';
import Module from '@components/Module.vue';
import RangeInput from '@components/RangeInput.vue';
import Toolbar from '@components/Toolbar.vue';

const ComponentName = 'Home';
export default defineComponent({
    name: ComponentName,
    data() {
        return {};
    },
    components: {
        Button,
        Frame,
        Icon,
        Input,
        Modal,
        Module,
        RangeInput,
        Toolbar,
    },
    methods: {
        openApp(appName: string, color: string) {
            if ('alt' in window) {
                alt.emit('play:Sound', 'SELECT', 'HUD_FRONTEND_DEFAULT_SOUNDSET');
            }
            this.$parent.openApp(appName, color);
        },
        defaultNavigation() {
            if ('alt' in window) {
                alt.emit('play:Sound', 'SELECT', 'HUD_FRONTEND_DEFAULT_SOUNDSET');
            }
        },
        startTerminal() {
            if ('alt' in window) {
                alt.emit('play:Sound', 'SELECT', 'HUD_FRONTEND_DEFAULT_SOUNDSET');
            }
        },
    },
});
</script>
<style scoped>
.fab2 {
    border-radius: 30% !important;
}

.button {
    padding: 3.5px !important;
}

.appbtn {
    float: left;
    /* width: 5%; */
    /* margin-right: 16%; */
    padding: 5px;
    /* box-sizing: border-box; */
}
.menu {
    padding: 1px;
}

.appbtn:last-child {
    margin-right: 0;
}

#homeScreen {
    min-height: calc(100% - 1vw);
    /* position: relative; */
}
#appScreen {
    min-height: calc(100% - 5vw);
    max-height: calc(100% - 5vw);
    overflow: auto;
    padding: 0.5vw;
    position: relative;
}
#appScreen::-webkit-scrollbar {
    display: none;
}
input[type='text'] {
    width: calc(100% - 0.5vw);
    margin: 0.25vw 0;
    background-color: var(--fav-dark);
    border: 0;
    padding: 0.25vw;
    color: var(--font);
    border-radius: 0.25vw;
    font-size: 0.75vw;
}

#fav,
#apps {
    display: flex;
    align-items: center;
    justify-content: center;
}
#apps {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
}
#fav {
    position: absolute;
    bottom: 0;
    width: calc(100% - 0.5vw);
    margin: 0.25vw;
    height: 3vw;
    background-color: var(--fav);
    border-radius: 1vw;
}
.app {
    background-color: #000;
    width: 2.75vw;
    height: 2.75vw;
    margin: 0.5vw;
    border-radius: 0.5vw;
    text-align: center;
    font-size: 1.5vw;
    line-height: 3vw;
    cursor: pointer;
    position: relative;
    user-select: none;
}
.app:hover {
    opacity: 0.75;
}

.appicon {
    line-height: 4.5vh;
    font-size: 1.5vw !important;
}
.favappicon {
    line-height: 4vh;
    font-size: 1.5vw !important;
}

#fav > .app {
    margin: 0.25vw;
    width: 2.5vw;
    height: 2.5vw;
    line-height: 2.75vw;
}
#appPhoneButton {
    background-color: rgb(22, 109, 19);
}
#appContactsButton {
    background-color: rgb(21, 141, 115);
}
#appMessagesButton {
    background-color: rgb(172, 109, 50);
}
#appAirplaneButton {
    background-color: rgb(34, 132, 189);
}
#appChargeButton {
    background-color: rgb(23, 153, 56);
}
#appWeatherButton {
    background-color: rgb(81, 158, 177);
}
#appGpsButton {
    background-color: rgb(59, 112, 212);
}
#appCalenderButton {
    background-color: rgb(51, 51, 51);
}
.contact {
    cursor: pointer;
}
#appContactsList > div {
    border-bottom: 0.05vw solid rgb(50, 121, 165);
    padding: 0.25vw;
    font-size: 0.75vw;
}
#appContactsEdit {
    display: none;
}
#appContactsOverview {
    display: none;
}
#editContactHead {
    font-size: 0.75vw;
    cursor: pointer;
    width: 50%;
}
#editContactLetter,
#editContactButtons > div {
    width: 3vw;
    height: 3vw;
    background-color: rgb(182, 182, 182);
    border-radius: 100%;
    margin-left: calc(100% / 2 - 1.5vw);
    text-align: center;
    font-size: 2vw;
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
}
#editContactButtons {
    width: 75%;
    margin: 1vw auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
#editContactDeleteButton {
    color: var(--red);
}
#editContactButtons > div {
    cursor: pointer;
    font-size: 1vw;
    width: 2.5vw;
    height: 2.5vw;
    margin-left: 0;
    opacity: 1;
    background-color: var(--fav);
}
#editContactButtons > div:hover {
    opacity: 0.7;
}
#editContactName {
    margin-top: 1vw;
    text-align: center;
}
</style>
