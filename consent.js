////////////////
// CONSENT
///////////////

// Using the multi select plugin.

// This one has an actual checkbox within jsPsych context. 
// And you can use the 'required = true' if you want to use it as a showstopper page. 
// Or (like demanded), it is now also possible to use additional conditional stuff, like proceeding 
// to the end page, probably.
// In this version, if you want things to look 'UU-legit', it takes a bunch of css within <style> tags

function getConsentData()
{
    let data = jsPsych.data.get().select('consent_choice_response');
    data = JSON.parse(data.values[0]);
    return data.consent;
}

const CONSENT_HTML_STYLE_UU = `<style>
        body {
            background: rgb(246, 246, 246);
            font-family: "Open Sans","Frutiger",Helvetica,Arial,sans-serif;
            color: rgb(33, 37, 41);
            text-align: left;
        }

        p {
            line-height: 1.4; /* Override paragraph for better readability */
        }

        label {
            margin-bottom: 0;
        }

        h1, h2{
            font-size: 2rem;
        }

        h6 {
            font-size: 1.1rem;
        }

        /* Input styles */

        form > table th {
            padding-left: 10px;
            vertical-align: middle;
        }

        input, textarea, select {
            border-radius: 0;
            border: 1px solid #d7d7d7;
            padding: 5px 10px;
            line-height: 20px;
            font-size: 16px;
        }

        input[type=submit], input[type=button], button, .button, .jspsych-btn {
            background: #000;
            color: #fff;
            border: none;
            font-weight: bold;
            font-size: 15px;
            padding: 0 20px;
            line-height: 42px;
            width: auto;
            min-width: auto;
            cursor: pointer;
            display: inline-block;
            border-radius: 0;
        }

        input[type="checkbox"], input[type="radio"]
        {
            width: auto;
        }

        button[type=submit], input[type=submit], .button-colored {
            background: #ffcd00;
            color: #000000;
        }

        button[type=submit].button-black, input[type=submit].button-black {
            background: #000;
            color: #fff;
        }

        button a, .button a,
        button a:hover, .button a:hover,
        a.button, a.button:hover {
            color: #fff;
            text-decoration: none;
        }

        .button-colored a,
        .button-colored a:hover,
        a.button-colored,
        a.button-colored:hover {
            color: #000;
        }

        /* Table styles */
        table thead th {
            border-bottom: 1px solid #ccc;
        }

        table tfoot th {
            border-top: 1px solid #ccc;
        }

        table tbody tr:nth-of-type(odd) {
            background: #eee;
        }

        table tbody tr:hover {
            background: #ddd;
        }

        table tbody tr.no-background:hover, table tbody tr.no-background {
            background: transparent;
        }

        table tbody td, table thead th, table tfoot th {
            padding: 6px 5px;
        }

        /* Link styles */
        a {
            color: rgb(33, 37, 41);
            text-decoration: underline;
            transition: 0.2s ease color;
        }

        a:hover {
            transition: 0.2s ease color;
            color: rgb(85, 85, 95);
        }

        </style>
        `
const CONSENT_HTML = `
    <p>Insert your information letter here; for more information, see the <a href="https://fetc-gw.wp.hum.uu.nl/en/" target="_blank">FEtC-H website</a></p>
    `
const DEBRIEF_MESSAGE_NO_CONSENT = `
    <h1>End of the experiment</h1><BR><BR>
    <h2>Thank you for <i>not</i> participating!</h2>
    `;
const DEBRIEF_MESSAGE_NO_CONSENT_DURATION = 3000;
const CONSENT_STATEMENT = `
    Yes, I consent to the use of my answers for scientific research.
    `;

const PROCEED_BUTTON_TEXT = "Continue";
const CONSENT_REFERENCE_NAME = 'consent';
const IF_REQUIRED_FEEDBACK_MESSAGE = `
        You must check the box next to '${CONSENT_STATEMENT}' in order to proceed to the experiment.
        `

let consent_block = {
    type: 'survey-multi-select',
    preamble: CONSENT_HTML_STYLE_UU + CONSENT_HTML,
    required_message: IF_REQUIRED_FEEDBACK_MESSAGE,
    questions: [
        {
            prompt: "", 
            options: [CONSENT_STATEMENT], 
            horizontal: true,
            required: false,
            button_label: PROCEED_BUTTON_TEXT,
            name: CONSENT_REFERENCE_NAME
        }
    ],
    on_finish: function(data){
        let consent_choice = data.responses;   
        data.consent_choice_response = consent_choice;
    }
};

let no_consent_end_screen = {
    type: 'html-button-response',
    stimulus: DEBRIEF_MESSAGE_NO_CONSENT,
    choices: [],
    trial_duration: DEBRIEF_MESSAGE_NO_CONSENT_DURATION,
    on_finish: function (data){
        jsPsych.endExperiment()
    }
};

let if_node_consent = {
    timeline: [no_consent_end_screen],
    conditional_function: function(data){
        let mydata = getConsentData();
        if (mydata == CONSENT_STATEMENT){
            return false;
        } else {
            return true;
        }
    }
}

let consent_procedure = {
    timeline: [consent_block, if_node_consent]
}
