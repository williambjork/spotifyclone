import { atom } from 'recoil'

const currentTrackIdState = atom ({
    key: "currentTrackIdState",
    default: null
});

const isPlayingState = atom ({
    key: "isPlayingState",
    default: false
});