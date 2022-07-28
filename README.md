# MedicoBetter: One stop Doctor Consulatancy portal
### Main branch: **FinalProj**
## Inspiration:


Problem it solves-
It provides the first of its kind hybrid healthcare portal which is responsible for making healthcare more accessible to people. It is designed in a way to keep the comfort of elderly people and people with special needs in our minds and provide them with the most user-friendly way to get healthcare support. Our motivation for these projects came from our real-life experiences with our grandparents in the cases when they had to go for a checkup to a hospital alone when their young ones are not available to go with them. We observed that in these cases it is very difficult for them to stand in long queues for making an appointment. Also, it is difficult for them to navigate in big multispeciality hospitals and look for their doctor's cabin. In some cases, it is just a regular verbal consultation that they require for which it is not sensible to travel a long distance. Our solution is aimed at providing comfortable healthcare solutions to these categories of people in both online and offline modes. Any Qualified doctor on entering our portal will have an option to register him/her in it and join our cause. Also, a blockchain-based patient management system will be provided to them. The patients entering our portal will have an option to browse various doctors registered on our portal with different specializations. After they select the required doctor, they can fill their details in and book an appointment. As it is a challenge for all to physically visit the doctor in these covid times and in case of mild symptoms the patient can choose to book the appointment in online mode. If it is booked in offline mode, and the patient booking the appointment is an elderly person or a person with special needs, then we will provide complimentary transport services to the hospital with door-to-door hospital staff assistance. Although anyone can use our portal to book an appointment priority will be given to elderly people and people with special needs.

## Bugs we encountered and rectified -
Firstly, we encountered a bug that our transactions were constantly failing. After some research and observations, we found out that
it was because we had multiple instances of a existing smart contract. To rectify, this we redeployed the smart contract into a new block chain.

Another bug we faced was that on re-rendering sometimes image files on the navbar weren't loading. Unfortunately,
We couldn't fix it. T_T

Also, since dynamic arrays don't exist in solidity, we faced a lot of issues in storing the patients for each doctor. To solve this, We used the doctor's account as the unique key to filter out the patients for a particular doctor.

One bug that we encountered was when we were uploading images to the reactjs. We tried changing the location of the image file from the directory to the directory but to no avail. Finally, we tried importing the image file as an object and added that object to the src field of the img tag. And guess what it worked!!


## What it does:
- Allows Doctors to register and accept appointments.
- Allows Patients to view all the registered doctors and make their appoinments accordingly.
- Allows Doctors to view their registered patients.
- Provides priority to appoitnments to senior citizens.
- Provides Ambulance services at the time of appointment.
- We have deployed the project on Polygon Mumbai testnet

## Tech Stack:
- Front-end:
  - ReactJs
  - HTML5
  - CSS
  - FramerMotion
- Back-end:
   - Solidity
   - Web3js
   - Node.js
   - Metamask
- Databsae:
   - Ethereum Smart Contracts

## Installation and Instructions:

1. Clone the project by
```
https://github.com/Knight-Night-666/Monies-Hackathon 
```
2. Navigate to the `starter-kit-master` folder by
```
cd starter-kit-master 
```
3. Install all npm packages by
```
npm install
```
4. Compile the Smart Contracts by
  ```
  truffle compile
  ```
5. Run the Development server by
  ```
  npm run start
  ```
6. Use the Metamask extension to connect to Ploygon Mumbai testnetwork.
## Demo:

Video demostration : https://youtu.be/R7jGyxOcMTE (Video Link)

Project related details(Images and description) : https://docs.google.com/document/d/1qUbFjrqeKwuotbfL-f1gB314MM7ChUuupz-T-e7dNNs/edit 

## Platform: Web based

## Tracks: 

- Healthcare
- Ethereum
- Polygon

## Scalability:
- In Future, we can implement various file storage techniques such as IPFS/Filecoin to store a patient's report and prescription. So, If a patient loses his prescription or report, he need not worry XD.
- Also, we can add a feature that if a patient agrees to share his location, he can look for doctors around his area for easy accessibility and treatment.
