
let jsPsych = initJsPsych(
    {
        exclusions: {
            min_width: MIN_WIDTH,
            min_height: MIN_HEIGHT
        },
        on_finish: function() {
            uil.saveData(ACCESS_KEY);
        }
    }
);

let start_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function(){
        return "<div class='instruction' >" +
               "<p>" + GENERIC_CHECK + "</p></div>";
    },
    choices: [OK_BUTTON_TEXT],
    response_ends_trial: true
};

let instruction_screen_practice = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function(){
        let text = PRE_PRACTICE_INSTRUCTION;
        text = text.replace('%correct_key%', getCorrectKey());
        text = text.replace('%incorrect_key%', getIncorrectKey());
        return "<div class='instruction' >" +
               "<p>" + text + "</p></div>";
    },
    choices: [OK_BUTTON_TEXT],
    response_ends_trial: true,
};

let participant_keyboard_control_start = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
        let text = PREPARE_YES_KEY_PROMPT;
        text = text.replace('%correct_key%', getCorrectKey())
        return "<div class='instruction' >" +
               "<p>" + text + "</p></div>";
    },
    choices: function(){
        let choice = getCorrectKey();
        return [choice];
    },
    //trial_duration: 10000,
    trial_ends_after_response: true,
    post_trial_gap: 300,
};

let well_done_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function(){
        return "<div class='instruction' >" +
            '<p>' + PRE_TEST_INSTRUCTION + '</p></div>';
    },
    choices: [OK_BUTTON_TEXT],
    response_ends_trial: true,
    data: { useful_data_flag: false }
};

let end_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: DEBRIEF_MESSAGE,
    choices: [],
    trial_duration: DEBRIEF_MESSAGE_DURATION
};

let present_fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<span style="font-size:40px;">+</span>',
    choices: jsPsych.NO_KEYS,
    trial_duration: FIXCROSS_DURATION
};

var present_prime_mask = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){ 
        return "<p class='stimulus'>" + jsPsych.timelineVariable('pmask', true) + "</p>";
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: PRIME_MASK_DURATION,
    post_trial_gap: 0,
    prompt: "",
    data: { useful_data_flag: false }
};

let present_prime = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
        return "<p class='stimulus'>" + 
               jsPsych.timelineVariable('prime', true) + "</p>";
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: PRIME_DURATION,
    post_trial_gap: PRIME_GAP_DURATION
};

let present_word = {
    type: jsPsychAudioKeyboardResponse,
    stimulus: jsPsych.timelineVariable('wordfn'), //this may nee inline func
    choices: function () {
        return [getCorrectKey(), getIncorrectKey()];
    },
    prompt: "",
    trial_ends_after_audio: false,
    trial_duration: RESPONSE_TIMEOUT_DURATION,
    response_ends_trial: true,
    post_trial_gap: DEFAULT_ITI,
    data: {
        condition: jsPsych.timelineVariable('item_type'),
        word: jsPsych.timelineVariable('word'),
        word_file: jsPsych.timelineVariable('wordfn'),
        prime: jsPsych.timelineVariable('prime'),
        prime_mask: jsPsych.timelineVariable('pmask'),
        id: jsPsych.timelineVariable('id'),
        trial_phase: 'present_word',
        useful_data_flag: true,
        expected_answer: jsPsych.timelineVariable('expected_answer')
    },
    on_finish: function(data){
        let convertToKeyCode = jsPsych.pluginAPI.convertKeyCharacterToKeyCode
        
        let correct_key = getCorrectKey()
        let incorrect_key = getIncorrectKey();
        let answer;
        let correct;
        
        // now, if this is the first time, we should set the keyboard exp vars
        if ( yes_key === undefined ){
            yes_key = correct_key;
        }
        if ( no_key === undefined ){
            no_key = incorrect_key;
        }
        let key_chosen_ascii = data.key_press;
        let key_chosen_char = upperCaseFromASCII(key_chosen_ascii);
        
        if (key_chosen_char === yes_key){
            answer = 1;
        } else if (key_chosen_char === no_key){
            answer = 0;
        } else { 
            answer = undefined;
        };
        correct = answer === data.expected_answer;
        data.correct = correct;
        data.integer_correct = data.correct ? 1 : 0;
        data.key_chosen_ascii = key_chosen_ascii;
        data.key_chosen_char = key_chosen_char;
        data.yes_key = yes_key;
        data.no_key = no_key;
    }
};

let present_feedback = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        let feedback_text = '<span style="color:red;font-size:30px;">Incorrect</span>';
        let last_resp_acc = jsPsych.data.getLastTrialData().values()[0].correct;
        if (last_resp_acc === true) {
            feedback_text = '<span style="color:green;font-size:30px;">Correct!</span>';
        }
        return feedback_text;
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: FEEDBACK_DURATION
};

// (timeline) procedures //////////////////////////////////////////////////////////

let practice_procedure = {
    timeline:[
        present_fixation,
        present_prime_mask,
        present_prime,
        present_word,
        present_feedback
    ],
    timeline_variables: getPracticeItems().table,
    randomize_order: false,
};

let trial_procedure_pseudorandom = {
    timeline:[
        present_fixation,
        present_prime_mask,
        present_prime,
        present_word,
    ],
    timeline_variables: null,
    randomize_order: false // this should be false if uil randomization is used...
};

let trial_procedure_random = {
    timeline:[
        present_fixation,
        present_prime_mask,
        present_prime,
        present_word
    ],
    timeline_variables: null,
    randomize_order: true // this should be true if you want jsPsych's randomization
};


// regular JS functions

function getCorrectKey()
{
    if (participant_info.hand_pref === ParticipantInfo.RIGHT)
        return KEYBOARD_DEFAULTS[chosen_keyboard].right_key;
    else
        return KEYBOARD_DEFAULTS[chosen_keyboard].left_key;
}

function getIncorrectKey()
{
    if (participant_info.hand_pref === ParticipantInfo.RIGHT)
        return KEYBOARD_DEFAULTS[chosen_keyboard].left_key;
    else
        return KEYBOARD_DEFAULTS[chosen_keyboard].right_key;
}

function initExperiment(stimuli) {

    console.log("The selected list is %s", stimuli.list_name);
    trial_procedure_pseudorandom.timeline = uil.randomization.randomizeStimuli(
        stimuli.table,
        MAX_SUCCEEDING_ITEMS_OF_TYPE,
        'item_type'
    );
    trial_procedure_random.timeline_variables = stimuli.table;

    ////////////////////////// media preloading ///////////////////////////////////////
    
    var beep_audio = ['./sounds/beep.mp3'];
    
    // create list of all audio files for preloading
    var practice_audio = [];
    let practice_items = getPracticeItems().table; 
    
    for (var i=0; i< practice_items.length; i++) {
        practice_audio.push(practice_items[i].wordfn);
    };

    // test audio list
    var test_audio = []; // the same...
    let test_items = stimuli.table;
    
    for (var i=0; i< test_items.length; i++) {
        test_audio.push(test_items[i].wordfn);
    };

    // experiment logic vars
    var handpref = undefined;


    // Data one would like to add to __all__ trials, according to:
    // https://www.jspsych.org/overview/data/
    
    let subject_id = jsPsych.randomization.randomID(8);
    let list_name = stimuli.list_name;

    jsPsych.data.addProperties({
        subject: subject_id,
        list: list_name,
    });


    //////////////// timeline /////////////////////////////////

    let timeline = [];

    // it's best practice to have *mouse click* user I/O first
    timeline.push(start_screen);
    
    // Informed consent (consent.js)
    timeline.push(consent_procedure);  
    
    // survey (survey.js)
    timeline.push(survey_procedure);
    
    // kb layout
    timeline.push(select_keyboard_layout);
    
    // kb important keys (keyboard.js)
    timeline.push(keyboard_set_key_left_procedure);
    timeline.push(keyboard_set_key_right_procedure);

    // test/set audio level (sountest.js)
    timeline.push(test_audio_looped);

    // task instruction (with button)
    timeline.push(instruction_screen_practice);

    // a keyboard dominant hand configured key continue/prepare flow
    timeline.push(participant_keyboard_control_start);
    
    timeline.push(practice_procedure);
    timeline.push(well_done_screen);

    // and a new 'prepare for action' flow
    timeline.push(participant_keyboard_control_start);

    // NOTE options below! comment/uncomment for regular vs restrained randomization
    // true randomness is better for the current template's amount of items...

    // timeline.push(trial_procedure_pseudorandom); // don't do this with little stimuli?
    timeline.push(trial_procedure_random);
    
    timeline.push(end_screen);

    // Start jsPsych when running on a Desktop or Laptop style pc.
    if (! uil.browser.isMobileOrTablet()) {
        jsPsych.run(timeline);
    }
    else { // or bail out.
        let paragraph = document.createElement("p")
        paragraph.innerHTML = BAIL_OUT_MOBILE_TEXT;
        document.body.appendChild(paragraph);
    }
}


function main() {
    // Option 1: client side balancing:
    let stimuli = pickRandomList();
    initExperiment(stimuli);

     // Option 2: server side balancing:
     // uil.session.start(ACCESS_KEY, (group_name) => {
     //     let stimuli = findList(group_name);
     //     initExperiment(stimuli);
     // });
}


