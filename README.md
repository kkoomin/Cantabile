# Cantabile

Cantabile is an iPad app for music students.

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

## User Stories

- Description of what a user should be able to do  
  Able to login/logout  
  Able to add and remove musical sheets
  Able to create and delete schedule on calendar
  Able to use the metronome whilst reading the score
  Able to use timer to count daily practice hours

## Project Schedule

- MVP features  
  [ ] calendar schedule add form  
  [ ] calendar schedule edit / delete  
  [ ] score list rendering  
  [ ] Metronome  
  [v] timer  
  [ ] daily to do list
  [ ] Login

- Final version features

- Stretch goals
  [ ] multiple timer
  [ ] page turner button for pdf
  [ ] metronome visualizer
  [ ] practice counter coloring game

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
