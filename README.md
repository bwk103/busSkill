# Bus times

A skill for the Amazon Echo using TFL's Unified API to give live bus information.

## The Problem

There are a plethora of both official TFL and third party applications that let you check on the status of your bus.  But, in my experience, when you're rushing around trying to make breakfast or get dressed, even the 30 seconds that it might take to check your phone could be better used elsewhere.

So, I set out to build a basic skill for the Amazon Echo and utilising TFL's Unified API which allows me to find out when my bus is due, via the minimum possible interaction with Alexa.

## Technology

This application was built using the following technology:

- Node.js
- Amazon's Alexa-SDK;
- AWS Lambda; and
- [bespoken-tools](https://bespoken.io/alexa-skills/) (for testing).


## Future Developments

Future versions of this application could allow for the following additional features:

- User is able to select and save a favourite stop via speech input;
- User is able to search for other stops using speech input; and
- User is able to select individual bus routes using speech input.

## Limitations

#### Minimising interactions with Alexa

I initially considered implementing the above features as part of an MVP, however I decided against this as I felt that it would have the effect of damaging the user experience to such an extent as to make the skill worthless.  My key ambition in making this application was to provide the user with live bus information as quickly as possible and this meant that I needed to minimise the user's interactions with Alexa.  

If the user were required to answer two or more questions to get the bus information from Alexa that user is likely to find it easier to use an application on their mobile device to get the same information.

#### Bus Stop Utterances

As part of a skill's development, the creator must submit a list of sample words that a user is likely to say in order to invoke a particular response from Alexa.  If I had included functionality to allow users to search for a particular bus stop, I would also have needed to submit a list of sample utterances containing the names of every road in London with a bus stop located on it.  In light of my limited aims for this project, I considered that this would be disproportionate.    
