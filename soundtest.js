//////////////
// soundtest
//////////// 

const AUDIO_PATH = './sounds/'; //currently not used!

const AUDIO_CHECK_PROMPT_TEXT_LOOP = `
    You can play the test sound again 
    (and adjust the audio level for your headpones). 
    If you're comfortable, click 'continue'...
    `
    
// audio test procedure

let test_audio_looped = {
    post_trial_gap: DEFAULT_ITI,
    timeline:
        [
            {
                type: jsPsychAudioButtonResponse,
                stimulus: AUDIO_TEST_STIMULUS,
                choices: ['Play Again', 'Continue'],
                prompt: function(){
                    return "<div class='instruction' >" +
                        '<p>' + AUDIO_CHECK_PROMPT_TEXT_LOOP + '</p></div>'
                }
            }
        ],
    loop_function: function(data){
        if (data.values()[0].response === 0){
            return true; // loop again!
        } else {
            return false; // continue
        }
    },
    on_finish: function(data) {
        data.audio_checked = true;
        if (typeof data.rt === "number") {
            data.rt = Math.round(data.rt);
        }
    }
};

let maybe_test_audio = {
    timeline : [test_audio_looped],
    conditional_function : experimentUsesAudio
};
