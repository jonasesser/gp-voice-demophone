<template>
    <div class="wrapper">
        <div id="smartphone" :style="{ 'background-color': backgroundColor }">
            <div id="head">
                <div id="clock">{{ gpTime() }}</div>
                <div id="notch"></div>
                <div id="headInfo">
                    <Icon icon="icon-battery1" class="fas fa-battery-full" id="battery" />
                    <Icon icon="icon-signal" class="fas fa-signal" id="signal" />
                </div>
            </div>
            <div class="content">
                <component :is="currentApp" class="fade-in"></component>
            </div>

            <div>
                <Button color="white" @click="openApp('home', 'rgb(37, 105, 150)')" class="homeButton"></Button>
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
import Apps from './apps/exports';

// Very Important! The name of the component must match the file name.
// Don't forget to do this. This is a note so you don't forget.
const ComponentName = 'DemoPhone';
export default defineComponent({
    name: ComponentName,
    components: {
        ...Apps, // App1, App2, App3,...
        Button,
        Frame,
        Icon,
        Input,
        Modal,
        Module,
        RangeInput,
        Toolbar,
    },
    data() {
        return {
            time: new Date(),
            backgroundColor: 'rgb(37, 105, 150)',
            currentApp: 'Home',
            apps: ['Home', 'About', 'Dial', 'Mail', 'Contacts', 'Calendar', 'Settings', 'Calculator'],
        };
    },
    mounted() {
        if ('alt' in window) {
            alt.on(`${ComponentName}:SetProp`, this.setProp);
            alt.emit(`${ComponentName}:Ready`);
        }
        this.loaded = false;
        this.updateDateTime();
    },
    unmounted() {
        if ('alt' in window) {
            alt.off(`${ComponentName}:SetProp`, this.setProp);
        }
    },
    methods: {
        setProp(propName: string, propValue: any, isJSON = false) {
            let wasJSON = false;

            // Handle JSON Data Passed from Client
            if (isJSON) {
                propValue = JSON.parse(propValue);
                wasJSON = true;
            }

            this[propName] = propValue;

            if (wasJSON) {
                this.updateCount += 1;
            }
        },
        openApp(appName: string, color: string) {
            if ('alt' in window) {
                alt.emit('play:Sound', 'SELECT', 'HUD_FRONTEND_DEFAULT_SOUNDSET');
            }
            this.backgroundColor = color;
            this.currentApp = appName;
        },
        powerOff() {
            if ('alt' in window) {
                alt.emit('play:Sound', 'SELECT', 'HUD_FRONTEND_DEFAULT_SOUNDSET');
                alt.emit('gpPhone:Close');
            }
        },
        updateDateTime() {
            setInterval(() => {
                this.time = new Date();
            }, 1000);
        },
        formattedDate() {
            return (
                ('0' + this.time.getDate()).slice(-2) +
                '.' +
                ('0' + (this.time.getMonth() + 1)).slice(-2) +
                '.' +
                this.time.getFullYear() +
                ' ' +
                ('0' + this.time.getHours()).slice(-2) +
                ':' +
                ('0' + this.time.getMinutes()).slice(-2)
            );
        },
        gpTime() {
            //Configuration Parameters
            const reallifeHoursADay = 24; // Day hours 24
            const ingameHoursADay = 48; // Ingame hours a Day

            //Current operation system time
            const currentHours = this.time.getHours();
            const currentMinutes = this.time.getMinutes();
            const currentSeconds = this.time.getSeconds();

            //TODO: Implement your own time zone calculation
            let ingameHours = currentHours;
            let ingameMinutes = currentMinutes;

            return ('0' + ingameHours).slice(-2) + ':' + ('0' + ingameMinutes).slice(-2);
        },
    },
});
</script>

<style scoped>
/* @import '../css/common.css'; */

body {
    background: #f1f1f1;
}

/* #app-container {
    padding-top: 100px;
    position: fixed;
    bottom: 50px;
    right: 10px;
} */

/* The device with borders */
.phone {
    position: absolute;
    bottom: 50px;
    right: 10px;
    width: 300px;
    height: 500px;
    margin: auto;
    border: 16px black solid;
    border-top-width: 60px;
    border-bottom-width: 60px;
    border-radius: 36px;
}

/* The horizontal line on the top of the device */
.phone:before {
    content: '';
    display: block;
    width: 60px;
    height: 5px;
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #333;
    border-radius: 10px;
}

/* The circle on the bottom of the device */
/* .phone:after {
    content: '';
    display: block;
    width: 35px;
    height: 35px;
    position: absolute;
    left: 50%;
    bottom: -65px;
    transform: translate(-50%, -50%);
    background: #333;
    border-radius: 50%;
} */

/* The screen (or content) of the device */
.phone .content {
    width: 100%;
    height: 100%;
    background: rgb(49, 45, 45);
    margin: 0px;
    background-image: url('./backgrounds/4.jpg');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

.button {
    padding: 4px !important;
}

.homebtn {
    position: absolute;
    top: 520px;
    right: 135px;
}

.powerbtn {
    position: absolute;
    top: -40px;
    right: 5px;
}

/* gcphone styles */

@font-face {
    font-family: 'Varela Round';
    font-style: normal;
    font-weight: 400;
    src: url('../font/varela-round-v12-latin-regular.eot');
    src: local('Varela Round Regular'), local('VarelaRound-Regular'),
        url('../font/varela-round-v12-latin-regular.eot?#iefix') format('embedded-opentype'),
        url('../font/varela-round-v12-latin-regular.woff2') format('woff2'),
        url('../font/varela-round-v12-latin-regular.woff') format('woff'),
        url('../font/varela-round-v12-latin-regular.ttf') format('truetype'),
        url('../font/varela-round-v12-latin-regular.svg#VarelaRound') format('svg');
}
.wrapper {
    --border: rgb(0, 0, 0);
    --font: #fff;
    /* --background: rgb(37, 105, 150); */
    --fav: rgb(25, 70, 100);
    --fav-dark: rgb(17, 47, 66);
    --red: rgb(207, 102, 102);
}
* {
    margin: 0;
    padding: 0;
    font-family: 'Varela Round', Helvetica, sans-serif;
}
*:focus {
    outline: none;
}
body {
    font-size: 1vw;
    overflow: hidden;
}
h5 {
    text-align: center;
    font-size: 1vw;
}
#smartphone {
    color: var(--font);
    background-color: var(--background);
    position: absolute;
    width: 15vw;
    height: 30vw;
    border: 0.2vw solid var(--border);
    right: 2vw;
    bottom: 2vw;
    border-radius: 0.75vw;
    box-shadow: 0 0 1vw var(--border);
    opacity: 0.9;
}
#head {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1vw;
    font-size: 0.7vw;
}
#head > div {
    text-align: center;
    padding-top: 0.25vw;
}
#notch {
    background-color: #000;
    min-height: 100%;
    border-bottom-left-radius: 0.5vw;
    border-bottom-right-radius: 0.5vw;
    width: 50%;
}

#clock {
    width: 18%;
    padding-right: 8px;
}

#headInfo {
    width: 18%;
    padding-left: 8px;
}

#headInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
#headInfo i {
    padding: 0.5vw;
}

.homeButton {
    position: absolute;
    bottom: 0;
    width: 2vw;
    height: 2vw;
    left: calc(100% / 2 - 1vw);
    bottom: 0;
    border: 0.1vw solid #000;
    border-radius: 100%;
    background-color: #000;
    opacity: 0.25;
    margin: 0.5vw 0;
}
.homeButton:hover {
    opacity: 0.5;
    cursor: pointer;
}

/* .homeButton {
    display: none;
} */
#appScreen {
    display: none;
}
</style>
