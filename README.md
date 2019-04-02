# Cantabile

Cantabile is a app for music students.

## Installation

```bash
npm start
```

## Feature

1. Calendar
2. PDF score reader
   - Metronome
3. Practice log
   - Timer
   - Daily ToDo List
4. Setting

## User Stories

- Description of what a user should be able to do  
  As a user, I will be able to login/logout  
  As a user, I will be able to add and remove scores(musical sheets)  
  As a user, I will be able to create and delete schedule

## Project Schedule

- MVP features  
  [ ] calendar schedule add form as modal  
  [ ] calendar schedule edit / delete  
  [ ] score list rendering  
  [ ] Metronome  
  [ ] timer  
  [ ] daily to do list

- Final version features

- Stretch goals

- Which features you plan on having done on which days

## Domain

- Models and schema  
  User  
  Score  
  Date  
  Schedule  
  ToDo

* Relationships (has_many/belongs_to)  
   User: has_many: Score, Date / has_many: Schedule, ToDo, through: :Date  
   Date: has_many: Schedule, ToDo

## Wire-Frames

## Technologies

- FrontEnd: React Native
- BackEnd: Ruby on Rails

- Libraries/gems: react-native-calendars, rn-pdf-reader-js
- APIs
