////////////////
// KEYBOARD
///////////////

// Keyboard choices
const KEYBOARD_CHOICES = ['QWERTY','AZERTY','DVORAK','QWERTZ','CUSTOM'];

// simple layout for left/right keys given some known layouts:
// Type     |   Left  |   Right
// ---------|---------|----------
// QWERTY   |   A     |  L
// AZERTY   |   Q     |  M
// DVORAK   |   A     |  S (or N?)
// QWERTZ   |   A     |  L
// OTHER    |   A     |  L (fallback, more tries?)

const QWERTY = { kb_type: 'QUERTY', left_key: "A", right_key: "L" };
const AZERTY = { kb_type: 'AZERTY', left_key: "Q", right_key: "M" };
const DVORAK = { kb_type: 'DVORAK', left_key: "A", right_key: "S" };
const QWERTZ = { kb_type: 'QWERTZ', left_key: "A", right_key: "L" };
const CUSTOM = { kb_type: 'CUSTOM', left_key: "1", right_key: "0" };

// Quick lookup table
const KEYBOARD_DEFAULTS = {
    'QWERTY': QWERTY,
    'AZERTY': AZERTY,
    'DVORAK': DVORAK,
    'QWERTZ': QWERTZ,
    'CUSTOM': CUSTOM,
};

const SELECT_KB_INSTRUCTION = '<h2>Choose the keyboard layout that looks most like yours</h2>'; 
const SELECT_KB_PROMPT = "Focus on the first 6 <strong>letters</strong> of your keyboard.";
const KEYBOARD_BUTTON_HTML = `
        <button class="img-btn">
        <img src=./images/%choice%.png></button>
        `;

// logic variables used by the keyboard validation routines
var repeat_validate_left_key = false;
var repeat_validate_right_key = false;

var left_key_confirmed = false;
var right_key_confirmed = false;

var chosen_keyboard = undefined;

var yes_key = undefined;
var no_key = undefined;

function upperCaseFromASCII(keycode)
{
    character = String.fromCharCode(keycode);
    return character.toUpperCase();
}

let select_keyboard_layout = {
    type: 'html-button-response',
    stimulus: SELECT_KB_INSTRUCTION,
    choices: KEYBOARD_CHOICES,
    prompt: SELECT_KB_PROMPT,
    button_html: KEYBOARD_BUTTON_HTML,
    on_finish: function(data) {
        let button_id = data.button_pressed;
        let button_number = parseInt(button_id, 10);
        let keyboard_chosen = KEYBOARD_CHOICES[button_number];
        data.keyboard = keyboard_chosen;
        chosen_keyboard = keyboard_chosen;
    }
};

let test_keyboard_key_left = {
    type: 'html-keyboard-response',
    stimulus: function(){
        return "<class='stimulus'>" +
               "<p>Press the <kbd>" +
                KEYBOARD_DEFAULTS[chosen_keyboard]['left_key'] +
               "</kbd> key on your keyboard.</p>";
    },
    choices: jsPsych.ALL_KEYS,
    response_ends_trial: true,
    stimulus_duration: 10000,
    trial_duration: 10000,
    post_trial_gap: 1000,
    prompt: "Please respond within 10 seconds.",
    data: {
        trial_phase: 'test_keyboard_key_left'
    },
    loop_function: function(data){
        return repeat_validate_left_key;
    },
    on_finish: function(data) {
        let expected_key_press = 
            jsPsych.pluginAPI.convertKeyCharacterToKeyCode(
            KEYBOARD_DEFAULTS[chosen_keyboard]['left_key']
            );
        let key_chosen_ascii = data.key_press;
        let key_chosen_char = 
            upperCaseFromASCII(key_chosen_ascii);
        data.key_confirmed = data.key_press == expected_key_press;
        data.key_chosen_ascii = key_chosen_ascii;
        data.key_chosen_char = key_chosen_char;
        left_key_confirmed = data.key_confirmed === true;
    }
};

let if_validated_key_left_feedback_needed = {
    type: 'html-button-response',
    stimulus: function() {
        let wanted_key = KEYBOARD_DEFAULTS[chosen_keyboard]['left_key'];
        let chosen_key = jsPsych.data.getLastTrialData().values()[0].key_chosen_char;
        return "<p> You were asked to press: " + wanted_key + "<BR><BR>" + 
               "You pressed: " + chosen_key +
               "<BR><BR>Try again, please...</p>";
    },
    choices: [OK_BUTTON_TEXT]
};

let if_key_left_node = {
    timeline: [if_validated_key_left_feedback_needed],
    conditional_function: function(){
        if (left_key_confirmed === true){
            repeat_validate_left_key = false;
            return false;
        } else {
            repeat_validate_left_key = true;
            return true;
        }
    }
};

let test_keyboard_key_right = {
    type: 'html-keyboard-response',
    stimulus: function(){
        return "<class='stimulus' >" +
               "<p>Press the <kbd>" +
                KEYBOARD_DEFAULTS[chosen_keyboard]['right_key'] +
               "</kbd> key on your keyboard.</p>";
    },
    choices: jsPsych.ALL_KEYS,
    response_ends_trial: true,
    stimulus_duration: 10000,
    trial_duration: 10000,
    post_trial_gap: 1000,
    prompt: "Please respond within 10 seconds",
    data: {
        trial_phase: 'test_keyboard_key_right'
    },
    on_finish: function(data) {
        let expected_key_press = 
            jsPsych.pluginAPI.convertKeyCharacterToKeyCode(
            KEYBOARD_DEFAULTS[chosen_keyboard]['right_key']
            );
        let key_chosen_ascii = data.key_press;
        let key_chosen_char = upperCaseFromASCII(key_chosen_ascii);
        data.key_confirmed = data.key_press == expected_key_press;
        data.key_chosen_ascii = key_chosen_ascii;
        data.key_chosen_char = key_chosen_char;
        right_key_confirmed = data.key_confirmed === true;
    }
};

let if_validated_key_right_feedback_needed = {
    type: 'html-button-response',
    stimulus: function() {
        let wanted_key = KEYBOARD_DEFAULTS[chosen_keyboard]['right_key'];
        let chosen_key = 
            jsPsych.data.getLastTrialData().values()[0].key_chosen_char;
        return "<p> You were asked to press: " + wanted_key + "<BR><BR>" + 
               "You pressed: " + chosen_key +
               "<BR><BR>Try again, please...</p>";
    },
    choices: [OK_BUTTON_TEXT]
};

let if_key_right_node = {
    timeline: [if_validated_key_right_feedback_needed],
    conditional_function: function(){
        if (right_key_confirmed == true){
            repeat_validate_right_key = false;
            return false;
        } else {
            repeat_validate_right_key = true;
            return true;
        }
    }
};

let keyboard_set_key_left_procedure = {
    timeline:[
        test_keyboard_key_left,
        if_key_left_node,
    ],
    loop_function: function(){
        return repeat_validate_left_key === true;
    }
}; 

let keyboard_set_key_right_procedure = {
    timeline:[
        test_keyboard_key_right,
        if_key_right_node,
    ],
    loop_function: function(){
        return repeat_validate_right_key === true;
    }
}; 
