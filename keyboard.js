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

var chosen_keyboard = undefined;

var yes_key = undefined;
var no_key = undefined;

function upperCaseFromASCII(keycode)
{
    character = String.fromCharCode(keycode);
    return character.toUpperCase();
}

let select_keyboard_layout = {
    type: jsPsychHtmlButtonResponse,
    stimulus: SELECT_KB_INSTRUCTION,
    choices: KEYBOARD_CHOICES,
    prompt: SELECT_KB_PROMPT,
    button_html: KEYBOARD_BUTTON_HTML,
    on_finish: function(data) {
        let button_number = data.response;
        let keyboard_chosen = KEYBOARD_CHOICES[button_number];
        data.keyboard = keyboard_chosen;
        chosen_keyboard = keyboard_chosen;
    }
};

let test_keyboard_key_left = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
        return "<class='stimulus'>" +
               "<p>Press the <kbd>" +
                KEYBOARD_DEFAULTS[chosen_keyboard]['left_key'] +
               "</kbd> key on your keyboard.</p>";
    },
    choices: "ALL_KEYS",
    response_ends_trial: true,
    stimulus_duration: 10000,
    trial_duration: 10000,
    post_trial_gap: 1000,
    prompt: "Please respond within 10 seconds.",
    confirmed: false, // whether or not the particpant pressed the expected button
    pressed: null,
    data: {
        trial_phase: 'test_keyboard_key_left'
    },
    on_finish: function(data) {
        let expected_key_press = KEYBOARD_DEFAULTS[chosen_keyboard]['left_key'];
        test_keyboard_key_left.pressed = data.response.toUpperCase();
        test_keyboard_key_left.confirmed =
            test_keyboard_key_left.pressed === expected_key_press;
        data.key_confirmed = test_keyboard_key_left.confirmed;
        data.pressed = test_keyboard_key_left.pressed;
    }
};

let if_validated_key_left_feedback_needed = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function() {
        let wanted_key = KEYBOARD_DEFAULTS[chosen_keyboard]['left_key'];
        let chosen_key = test_keyboard_key_left.pressed;
        return "<p> You were asked to press: " + wanted_key + "<BR><BR>" + 
               "You pressed: " + chosen_key +
               "<BR><BR>Try again, please...</p>";
    },
    choices: [OK_BUTTON_TEXT]
};

let if_key_left_node = {
    timeline: [if_validated_key_left_feedback_needed],
    conditional_function: function(){
        return test_keyboard_key_left.confirmed !== true;
    }
};

let test_keyboard_key_right = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
        return "<class='stimulus' >" +
               "<p>Press the <kbd>" +
                KEYBOARD_DEFAULTS[chosen_keyboard]['right_key'] +
               "</kbd> key on your keyboard.</p>";
    },
    choices: "ALL_KEYS",
    response_ends_trial: true,
    stimulus_duration: 10000,
    trial_duration: 10000,
    post_trial_gap: 1000,
    prompt: "Please respond within 10 seconds",
    confirmed: false, // whether or not the particpant pressed the expected button
    pressed: null, // the key pressed.
    data: {
        trial_phase: 'test_keyboard_key_right'
    },
    on_finish: function(data) {
        let expected_key_press = KEYBOARD_DEFAULTS[chosen_keyboard]['right_key']

        test_keyboard_key_right.pressed = data.response.toUpperCase();
        test_keyboard_key_right.confirmed =
            test_keyboard_key_right.pressed === expected_key_press;
        data.key_confirmed = test_keyboard_key_right.confirmed;
        data.pressed = test_keyboard_key_right.pressed;

    }
};

let if_validated_key_right_feedback_needed = {
    type: jsPsychHtmlButtonResponse,
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
        return test_keyboard_key_right.confirmed !== true;
    }
};

let keyboard_set_key_left_procedure = {
    timeline:[
        test_keyboard_key_left,
        if_key_left_node,
    ],
    loop_function: function(){
        return test_keyboard_key_left.confirmed !== true;
    }
}; 

let keyboard_set_key_right_procedure = {
    timeline:[
        test_keyboard_key_right,
        if_key_right_node,
    ],
    loop_function: function(){
        return test_keyboard_key_right.confirmed !== true;
    }
}; 
