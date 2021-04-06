import { Machine } from 'xstate'

const TS_STATES = {
    START: 'START',
    ETHERNET_OR_WIFI: 'ETHERNET_OR_WIFI',
    ETHERNET: 'ETHERNET',
    WIFI: 'WIFI',
    OTHER_CAN_CONNECT: 'OTHER_CAN_CONNECT',
    OTHER_CANNOT_CONNECT: 'OTHER_CANNOT_CONNECT',
    MODEM_PROBLEM: 'MODEM_PROBLEM',
    CANNOT_PING_GATEWAY: 'CANNOT_PING_GATEWAY',
    REPLUG: 'REPLUG',
    RESTART_MODEM: 'RESTART_MODEM',
    CANNOT_SOLVE: 'CANNOT_SOLVE',
    COMPUTER_PROBLEM: 'COMPUTER_PROBLEM',
    ADSL_DIAL: 'ADSL_DIAL',
    WIFI_CONNECT_DIRECTLY: 'WIFI_CONNECT_DIRECTLY',
    SOLVED: 'SOLVED',
    NEED_ASSISTANT: 'NEED_ASSISTANT',
}

const TS_EVENTS = {
    YES: 'YES',
    NO: 'NO',
    CONFIRM: 'CONFIRM'
}

export const TS_Machine = Machine({
    initial: TS_STATES.START,
    states: {
        [TS_STATES.START]: {
            on: {
                [TS_EVENTS.CONFIRM]: TS_STATES.ETHERNET_OR_WIFI
            },
            meta: {
                message: 'Welcome to Network TroubleShooting System, hope we can solve your problem.'
            }
        },
        [TS_STATES.ETHERNET_OR_WIFI]: {
            on: {
                [TS_EVENTS.YES]: TS_STATES.ETHERNET,
                [TS_EVENTS.NO]: TS_STATES.WIFI,
            },
            meta: {
                message: 'Are you using Ethernet cable directly connected to your computer?'
            }
        },
        [TS_STATES.ETHERNET]: {
            on: {
                [TS_EVENTS.YES]: TS_STATES.OTHER_CAN_CONNECT,
                [TS_EVENTS.NO]: TS_STATES.OTHER_CANNOT_CONNECT,
            },
            meta: {
                message: 'Can you access the internet from other devices through Ethernet cable or wifi?'
            }
        },
        [TS_STATES.OTHER_CAN_CONNECT]: {
            on: {
                [TS_EVENTS.YES]: TS_STATES.SOLVED,
                [TS_EVENTS.NO]: TS_STATES.COMPUTER_PROBLEM,
            },
            meta: {
                message: 'Well, seems you have a problem with the Enthernet cable, please try to unplug and plug the cable,if this doesn\'t work, try a new cable. Can you access the internet now?',
                picture: '1.png'
            }
        },
        [TS_STATES.COMPUTER_PROBLEM]: {
            on: {
                [TS_EVENTS.YES]: TS_STATES.SOLVED,
                [TS_EVENTS.NO]: TS_STATES.NEED_ASSISTANT
            },
            meta: {
                message: `You might have problem with your computer, this can cause by Network Interface Card, or firewall, or computer virus,etc. Please try these steps:
                1. Restart browser or computer.
                2. Turn off fire wall.
                3. Scan virus.
                4. Make sure your network card works.

                After  those steps, can you access network now?
                `
            }
        },
        [TS_STATES.REPLUG]: {
            on: {
                [TS_EVENTS.YES]: TS_STATES.SOLVED,
                [TS_EVENTS.NO]: TS_STATES.NEED_ASSISTANT,
            },
            meta: {
                message: "The problem is modem, let's first try plug and unplug the cables that are connected to it, or replace the cable with other one. Did you solve the problem?",
                picture: '2.png'
            }
        },
        [TS_STATES.RESTART_MODEM]: {
            on: {
                [TS_EVENTS.YES]: TS_STATES.SOLVED,
                [TS_EVENTS.NO]: TS_STATES.NEED_ASSISTANT,
            },
            meta: {
                message: 'Turn off the gateway device and the modem for 5 mins then start again. Can you access to internet now ?'
            }
        },
        [TS_STATES.CANNOT_SOLVE]: {
            on: {
                [TS_EVENTS.YES]: TS_STATES.SOLVED,
                [TS_EVENTS.NO]: TS_STATES.NEED_ASSISTANT
            },
            meta: {
                message: ` Try these steps:
1.Check if you forgot to pay the bill.
2.  Restart the computer.
3. check the IP address Configuration.
4. Turn off the vpn.
5. Try replug on modem or replace with new cable.

Did you solve your problem?`
            }
        },
        [TS_STATES.OTHER_CANNOT_CONNECT]: {
            on: {
                [TS_EVENTS.YES]: TS_STATES.REPLUG,
                [TS_EVENTS.NO]: TS_STATES.CANNOT_PING_GATEWAY,
            },
            meta: {
                message: "Please follow the steps below, we are trying find out whether the problem is from the gateway. Is there any active status ?",
                pictures: ['ping1.png', 'ping2.png', 'ping3.png']
            }
        },

        [TS_STATES.CANNOT_PING_GATEWAY]: {
            on: {
                [TS_EVENTS.YES]: TS_STATES.SOLVED,
                [TS_EVENTS.NO]: TS_STATES.NEED_ASSISTANT,
            },
            meta: {
                message: 'Turn off the gateway device and the modem for 5 mins then start again. Can you access to internet now ?'
            }
        },
        [TS_STATES.WIFI]: {
            on: {
                [TS_EVENTS.YES]: TS_STATES.SOLVED,
                [TS_EVENTS.NO]: TS_STATES.WIFI_CONNECT_DIRECTLY,
            },
            meta: {
                message: 'Please try to restart the WIFI router, modem(if have), gataway device and computer. Does it work now ?'
            }
        },
        [TS_STATES.WIFI_CONNECT_DIRECTLY]: {
            on: {
                [TS_EVENTS.YES]: TS_STATES.ADSL_DIAL,
                [TS_EVENTS.NO]: TS_STATES.OTHER_CANNOT_CONNECT,
            },
            meta: {
                message: 'Let\'s now try to use Ethernet cable directly plug into you computer. Problem solved?'
            }
        },
        [TS_STATES.ADSL_DIAL]: {
            on: {
                [TS_EVENTS.YES]: TS_STATES.SOLVED,
                [TS_EVENTS.NO]: TS_STATES.OTHER_CANNOT_CONNECT
            },
            meta: {
                message: 'Use the ADSL dial method to access internet by log in you user account and password that you carrier provide to you.  Is the problem solved now ? ',
                //    ===================拨号上网的3 张图片 todo !! dial1.png dial2.png dial3.png===============
                pictures: ['dial1.png', 'dial2.png', 'dial3.png']

            }
        },
        [TS_STATES.SOLVED]: {
            type: 'final',
            meta: {
                redirect: 'solved'
            }
        },
        [TS_STATES.NEED_ASSISTANT]: {
            type: 'final',
            meta: {
                redirect: 'assistant'
            }
        }
    },
})
