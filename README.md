# jspsych-audlexdec-vp-vm
Auditory [Lexical Decision](https://en.wikipedia.org/wiki/Lexical_decision_task) Experiment with _Visual Masked Prime_ (template)

# Generic documentation
Please read the [generic documentation](https://github.com/UiL-OTS-labs/jspsych-uil-template-docs) for some context and scope.

# Task Description
Visually primed auditory lexical decision task with a visual mask: the participant sees a fixation cross, mask and visual prime and then hears a real word or a non existing word (non-word). The task is to respond as quickly as possible and indicate wether the heard word is a real word or not (or wether both the visual and the heard word are real words, it depends on the instructions.

Crucial trial phases (sub trial phases):
- Fixation cross
- Visual Mask ('#####')
- Visual Prime 
- Auditory item (Decision phase)

### Reference:
        Rubenstein, H., Garfield, L., & Millikan, J.A. (1970). 
        Homographic entries in the internal lexicon. 
        Journal of Verbal Learning and Verbal Behavior, 9, 487≠494.

# Output

The data of _all_ (sub) _trial phases_ are logged in the data, but the output data can be filtered after data collection in many ways.
Please read the [general primer on jsPsych's data](https://github.com/UiL-OTS-labs/jspsych-output) if you are new to jsPsych data output.

Essential output for the _'true experimental'_ purpose in this template are:

- Reaction Time (RT) of the keyboard response in the decision phase
- Correctness of the keyboard response in the decision phase

The crucial trial/sub-trial phase (decision phase) output may look similar to this:

```json
	{
		"rt": 583,
		"stimulus": "./sounds/white.wav",
		"key_press": 65,
		"condition": "RELATED",
		"word": "white",
		"word_file": "./sounds/white.wav",
		"prime": "snow",
		"prime_mask": "####",
		"id": 5,
		"trial_phase": "present_word",
		"useful_data_flag": true,
		"correct_response": 1,
		"trial_type": "audio-keyboard-response",
		"trial_index": 26,
		"time_elapsed": 46171,
		"internal_node_id": "0.0-12.0-3.0",
		"subject": "kd9tsn3y",
		"list": "my_one_and_only_list",
		"correct": true,
		"key_chosen_ascii": 65,
		"key_chosen_char": "A",
		"yes_key": "A",
		"no_key": "L"
	},
	//(...)
```
# Getting started 
People _affiliated with our lab_ can use the information [from our lab webiste](https://uilots-labs.wp.hum.uu.nl/experiments/overview/) and expand the "Online experiments using jsPsych" section for details. Please follow [this how-to](https://uilots-labs.wp.hum.uu.nl/how-to/online-experimenting/).

### Make your experiment ready for use with the data server

### Update access key
In the file `globals.js` is a variable:
```javascript
const ACCESS_KEY = '00000000-0000-0000-0000-000000000000';
```
Before uploading your experimentto the UiL-OTS data server, you will need to change this to the access_key that you obtained when your experiment was approved. For elaborate info see `globals.js`.


### Adapting stimuli
- Open the file `stimuli.js` in your plain text editor.
- There is a list, called LIST_1:

```javacript
const LIST_1 = [ // stimuli and timeline variables

```
-  This list can be adapted to your own needs, i.e, you can replace values, make the list longer (don't forget to increment the 'id' values for new items!).
- If you need to implement a more complex design, you should read the `stimuli.js` file (and its comment sections) a little better. 
- For an example of a Latin square design, please have a look [here](https://github.com/UiL-OTS-labs/jspsych-spr-mw).

