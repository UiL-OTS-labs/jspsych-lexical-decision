/*
 * This file contains all the possible discrete sub trials of
 * a lexical decision task.
 */

/*
 * Presents the fixation cross
 */
let present_fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<span style="font-size:40px;">+</span>',
    choices: "NO_KEYS",
    trial_duration: FIXCROSS_DURATION,
    on_finish: function(data) {
        if (typeof data.rt == "number") {
            data.rt = Math.round(data.rt);
        }
    }
};

/*
 * This stimulus will present a forward mask
 */
let forward_mask = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
        return "<p class='stimulus'>" +
            jsPsych.timelineVariable('forward_mask', true) +
            "</p>";
    },
    choices: "NO_KEYS",
    trial_duration: MASK_DURATION,
    data: { useful_data_flag: false },
    on_finish(data) {
        if (typeof data.rt == "number") {
            data.rt = Math.round(data.rt);
        }
    }
};

/*
 * This stimulus will present a visual prime stimulus
 */
let visual_prime = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
        return "<p class='stimulus'>" +
            jsPsych.timelineVariable('visual_prime', true) + "</p>";
    },
    choices: "NO_KEYS",
    trial_duration: PRIME_DURATION,
    post_trial_gap: PRIME_GAP_DURATION,
    on_finish(data) {
        if (typeof data.rt == "number") {
            data.rt = Math.round(data.rt);
        }
    }
};

/*
 * This will present an auditory prime stimulus.
 */
let auditory_prime = {
    type : jsPsychAudioKeyboardResponse,
    stimulus : function() {return jsPsych.timelineVariable("auditory_prime");},
    choices : "NO_KEYS",
    trial_duration : PRIME_DURATION,
    post_trial_gap : PRIME_GAP_DURATION,
    on_finish(data) {
        if (typeof data.rt == "number") {
            data.rt = Math.round(data.rt);
        }
    }
}

/*
 * this will present a backwards mask.
 */
let backward_mask = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
        return "<p class='stimulus'>" +
            jsPsych.timelineVariable('backward_mask', true) +
            "</p>";
    },
    choices: "NO_KEYS",
    trial_duration: MASK_DURATION,
    data: { useful_data_flag: false },
    on_finish(data) {
        if (typeof data.rt == "number") {
            data.rt = Math.round(data.rt);
        }
    }
}

/**
 * Returns an array that represents the allowed choices to respond.
 *
 * @return {(string|*)[]}
 */
function createChoicesArray() {
    return [getWordKey(), getNonWordKey()];
}

/*
 * This saves the data of a visual or auditory target stimulus
 */
function saveTargetData(data) {
    let word_key = getWordKey();
    let answer = null;
    let pressed_key = null;

    if (data.response !== null) {
        pressed_key = data.response.toUpperCase();
    }

    // Add "static" information to output
    data.id = jsPsych.timelineVariable('id');
    data.condition = jsPsych.timelineVariable('item_type');
    data.word = jsPsych.timelineVariable('word');
    data.expected_answer = jsPsych.timelineVariable('expected_answer');
    data.forward_mask = jsPsych.timelineVariable('forward_mask');
    data.visual_prime = jsPsych.timelineVariable('visual_prime');
    data.auditory_prime = jsPsych.timelineVariable('auditory_prime');
    data.backward_mask = jsPsych.timelineVariable('backward_mask');
    data.auditory_target = jsPsych.timelineVariable('auditory_target');
    data.visual_target = jsPsych.timelineVariable('visual_target');
    data.useful_data_flag = true; // Mark this stimulus as import for analysis.

    // compute correctness, pressed_key could be null in case of no response.
    if (typeof pressed_key === 'string') {
        answer = pressed_key === word_key ? 1 : 0;
    }

    // Add dynamic info to output.
    data.answer = answer;
    data.correct = answer === data.expected_answer;
    // Some find an integer representation of a boolean handy for analysis.
    data.integer_correct = data.correct ? 1 : 0;
    data.pressed_key = pressed_key;
    
    if (typeof data.rt == "number") {
        data.rt = Math.round(data.rt);
    }
}

/*
 * This will present an auditory target word. The participant should
 * decide whether it is a word or not.
 *
 * Note: At would be at least weird to have both an auditory and a visual target.
 */
let auditory_target = {
    type: jsPsychAudioKeyboardResponse,
    stimulus: function() {
        return jsPsych.timelineVariable('auditory_target')
    },
    choices: createChoicesArray,
    trial_duration: RESPONSE_TIMEOUT_DURATION,
    response_ends_trial: true,
    post_trial_gap: DEFAULT_ITI,
    on_finish: function(data) {
        saveTargetData(data);
    }
};

/*
 * This will present an visual target word. The participant should
 * decide whether it is a word or not.
 *
 * Note: At would be at least weird to have both an auditory and a visual target.
 */
let visual_target = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        return "<p class='stimulus'>" +
            jsPsych.timelineVariable('visual_target', true) +
            "</p>";
    },
    choices: createChoicesArray,
    trial_duration: RESPONSE_TIMEOUT_DURATION,
    response_ends_trial: true,
    post_trial_gap: DEFAULT_ITI,
    on_finish: function(data) {
        saveTargetData(data);
    }
};

let present_feedback = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        let incorrect_feedback_text =
            `<span class="feedback_incorrect">${INCORRECT_TEXT}</span>`;
        let correct_feedback_text =
            `<span class="feedback_correct">${CORRECT_TEXT}</span>`;
        let last_resp_acc = jsPsych.data.getLastTrialData().values()[0].correct;
        if (last_resp_acc === true) {
            return correct_feedback_text
        }
        return incorrect_feedback_text;
    },
    choices: "NO_KEYS",
    trial_duration: FEEDBACK_DURATION,
    on_finish(data) {
        if (typeof data.rt == "number") {
            data.rt = Math.round(data.rt);
        }
    }
};
