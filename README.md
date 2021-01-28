# jspsych-audlexdec-vp
Auditory [Lexical Decision](https://en.wikipedia.org/wiki/Lexical_decision_task) Experiment with _Visual Masked Prime_ (template)

# Generic documentation
Please read the [generic documentation](https://github.com/UiL-OTS-labs/jspsych-uil-template-docs) for some context and scope.

# Task Description

## Short description

This is one of many 'standard' variations of a visual lexical decision task. This version uses auditory stimuli.

The participant first sees a fixation cross, then a (forward) _masked_ prime is presented, followed by the second stimulus (the response word or non-word). Particpants are instructed to respond as quickly as possible to make the decision if the (last) word was an actual word --or not-- using the keyboard.

- The (forward) _mask_ is a string of characters of (preferably) the same amount of characters as the prime.
- The _prime_ is a string of letters and can be a real word or a nonword.
- The _'test stimulus'_ is a reference to an audio file and can be a real word or a nonword.

A reference that descibes this variant's method (although this one works with audio files):

Jacob, G., Heyer, V., & Veríssimo, J. (2018). Aiming at the same target: A masked priming study directly comparing derivation and inflection in the second language. International Journal of Bilingualism, 22(6), 619–637. https://doi.org/10.1177/1367006916688333

## Longer description
There are many (slightly) different variations of a lexical decision task. In this version, a trial consists of subsequently presenting _two_ words or nonwords. The participant needs to make a swift decision whether the _pair_ of presented sets of letters - the test stimuli - are _both_ acutal words or not. 

The naming conventions for this pair can be slightly confusing. The general convention will be to differentiate between a 'prime' and the 'test stimulus', even though in a way, the _pair_ _is_ the test stimulus, both in what defines a single trial, and in the way to prepare the stimuli.js structure (the code).

The essential sub trial phases for _one_ trial for this boilerplate experiment are:
1. Fixation cross presentation (fixed time, no responses are recorded) 
2. Mask presentation (fixed time, no responses are recorded)
3. Prime presentation (fixed time, no responses are recorded)
4. Test stimulus presentation (the last string of letters of the presented pair, lexical decision phase). 

Only in this _last phase_, as soon as the "test item" is being presented, the participant can respond with the keyboard.

## Output
The reaction time, response and correctness of the response are usually the important variables for analysis.

The data of _all_ (sub) _trial phases_ are logged in the data, but the output data can be filtered after data collection in many ways.
Please read the [general primer on jsPsych's data](https://github.com/UiL-OTS-labs/jspsych-output) if you are new to jsPsych data output.

Essential output for the _'true experimental'_ purpose in this template are:

- Reaction Time (RT) of the keyboard response in the decision phase
- Correctness of the keyboard response in the decision phase

The following code block, 'present_word' (exerpt from 'index.html' contents) yields the relevant RT and correctness of responses
```javascript
        let present_word = {
            type: 'html-keyboard-response',
            stimulus: function(){
                return "<p class='stimulus'>" + jsPsych.timelineVariable('word', true) + "</p>";
            },
            choices: present_word_choices,
            response_ends_trial: true,
            stimulus_duration: WORD_DURATION,
            trial_duration: RESPONSE_TIMEOUT_DURATION,
            post_trial_gap: DEFAULT_ITI,
            prompt: "",
            data: {
                condition: jsPsych.timelineVariable('item_type'),
                word: jsPsych.timelineVariable('word'),
                word_file: jsPsych.timelineVariable('wordfn'),
                prime: jsPsych.timelineVariable('prime'),
                mask: jsPsych.timelineVariable('pmask'),
                id: jsPsych.timelineVariable('id'),
                trial_phase: 'present_word',
                useful_data_flag: true,
                correct_response: jsPsych.timelineVariable('correct')
            },
            //...(left out for brevity)
   ```
In the `data: { ` section of the above code, you see some `'key: value'` pairs. They implement the stimulus definitions (`stimuli.js`) to the presentation phase (in `index.html`) and connect relevant data needed in that trial phase. These can then also be used in context and added in the output. In this case,`'condition', 'word', 'prime', 'id', 'pmask', 'wordfn'` and `'correct_response'` reference 'timelineVariable' information from `stimuli.js`, whereas `'trial_phase'` and `'useful_data_flag'` are added there 'directly'. 

The 'useful_data_flag' was added so it could be used for filtering the aggregate of output from your online experiment. You can alter or add data (key, value pairs) according to your own goals and needs, but you would need to edit the present_block, be careful and concise!

The 'raw' ([JSON](https://www.json.org/json-en.html)) output data of a `'present_word'` 'trial' (our 'trial' is in fact a _sub trial phase_) may look like this:

```JSON
     {
    		"rt": null,
		"stimulus": "./sounds/crawse.wav",
		"key_press": null,
		"condition": "NON_WORD",
		"word": "crawse",
		"word_file": "./sounds/crawse.wav",
		"prime": "piano",
		"prime_mask": "#####",
		"id": 2,
		"trial_phase": "present_word",
		"useful_data_flag": true,
		"trial_type": "audio-keyboard-response",
		"trial_index": 53,
		"time_elapsed": 69299,
		"internal_node_id": "0.0-11.0-3.7",
		"subject": "pynrlguo",
		"group": "group1",
		"key_chosen_ascii": null,
		"key_chosen_char": "\u0000",
		"correct": false
	},
 ...
 ```
Clearly, it contains a lot more `key: value` pairs than what was mentioned above in the experpt `present_word` trial from `index.html`. 

- Some of them are native to jsPsych and have been mentioned in the primer on data output. 
- Others have been explicitly added to the data in the ```on_finish()``` method call that happens further down in the `present_word` trial definition. 
- Open ```index.html``` in your plain text editor for more details.

Here is a description of the above example, using "#" as comments on the `"key: value"` pairs:



```JSON
                                               #this is a comment

"rt": 368.0000000000073,                       # Reaction Time, in miliseconds (jsPysch default)
"stimulus": "./sounds/crawse.wav",             # jsPsych default: what is the stimulus.
"key_press": 76,                               # The word or string and/or its HTML specifics (jsPsych default)
"condition": "NON_WORD",                       # ASCII code of keyboard key pressed within phase (jsPysch default)
"word": "crawse",                              # timelineVariable from 'stimuli.js' (UiL template default)
"prime": "piano",                              # timelineVariable from 'stimuli.js' (UiL template default)
"id": 2,                                       # timelineVariable from 'stimuli.js' (UiL template default)
"trial_phase": "present_word",                 # timelineVariable from 'stimuli.js' (UiL template default)
"useful_data_flag": true,                      # (UiL template default filter flag)
"correct_response": 0,                         # timelineVariable from 'stimuli.js' (UiL template default)
"trial_type": "html-keyboard-response",        # jsPysch default
"trial_index": 25,                             # jsPysch default                          
"time_elapsed": 44933,                         # jsPysch default
"internal_node_id": "0.0-11.0-2.1",            # jsPysch default
"subject": "f9pdgg60",                         # Subject ID (from index.html)(UiL template default)             
"list": "my_one_and_only_list",                # Name of the list of epxerimental stimuli (UiL template default)
"correct": true,                               # Scored response value {true or talse }(UiL template default)
"key_chosen_ascii": 76,                        # Info on key chosen in experiment trial (UiL template default)
"key_chosen_char": "L",                        # Info on key chosen in experiment trial (UiL template default)
"yes_key": "A",                                # Info on key defined for participant for choosing 'yes' (UiL template default)
"no_key": "L"                                  # Info on key defined for participant for choosing 'no' (UiL template default)
```

# Getting started (Experiment Datastore set up)

- Make sure you have a functioning internet connection!
- Do this on a desktop PC or a laptop. Do _NOT_ use a mobile device, like a phone or tablet!

The easiest way to test a template _as is_:

1. Download this repository by clicking the green code button above and Download zip.
2. Unzip the jspsych-vislexdec-vp-main.zip at a location of your choosing.
3. Inside the folder is a file called index.html, double click it in order to open it
   in a browser.

### Adapting stimuli
- Open the file `stimuli.js` in your plain text editor.
- Note, there is a list, called LIST_1, it could look like this (or slightly different, due to new design considerations):

```const LIST_1 = [
    {
        id: 1, 
        item_type: NON_WORD, 
        word: "slirque", 
        wordfn: "./sounds/slirque.wav",
        prime: "eyes",
        pmask: "####"
    },
    {
        id: 2, 
        item_type: NON_WORD, 
        word: "crawse", 
        wordfn: "./sounds/crawse.wav",
        prime: "piano",
        pmask: "#####"
    },
    {
        id: 3, 
        item_type: NON_WORD, 
        word: "thwurp", 
        wordfn: "./sounds/thwurp.wav",
        prime: "rabbit",
        pmask: "######"
    },
    {
        id: 4, 
        item_type: NON_WORD, 
        word: "clem", 
        wordfn: "./sounds/clem.wav",
        prime: "flower",
        pmask: "######"
    }, 
    {
        id: 5, 
        item_type: RELATED, 
        word: "white", 
        wordfn: "./sounds/white.wav",
        prime: "snow",
        pmask: "####"
    },
    {
        id: 6, 
        item_type: RELATED, 
        word: "travel", 
        wordfn: "./sounds/travel.wav",
        prime: "suitcase",
        pmask: "########"
    },
    {
        id: 7, 
        item_type: UNRELATED, 
        word: "letter", 
        wordfn: "./sounds/letter.wav",
        prime: "garden",
        pmask: "######"
    },
    {
        id: 8, 
        item_type: UNRELATED, 
        word: "clown", 
        wordfn: "./sounds/clown.wav",
        prime: "forest",
        pmask: "######"
    }
];

```
- This list can be adapted to your own needs, i.e, you can replace values, make the list longer (don't forget to increment the 'id' values for new items!).
- If you need to implement a more complex design, you should read the file and its comment sections a little better. 
- For an example of a Latin square design, please have a look [here](https://github.com/UiL-OTS-labs/jspsych-spr-mw) for some inspiration. 

In short: you can add additional lists if your experiment requires this, but then you also have to edit some other values in stimuli.js in order for your experiment to work as intended.

## Prepare for the data server setup (only for people affiliated to our lab!)

### Updating access key
In the file `globals.js` is a variable:
```javascript
const ACCESS_KEY = 'zeekretkey';
```
For uploading to the UiL-OTS data server you will need to change this to the access_key that you obtained when your experiment was approved. For elaborate info see `globals.js`.

Good luck!

