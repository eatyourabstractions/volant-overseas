import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
  email: String,
  password: String,
  businessName: String,
  firstName: String,
  lastName: String,
  displayName: String,
  providerId: String,
  provider: String,
  dateOfBirth: Date, 
  gender: String,
  contactNumber: Number,
  registrationDate: Date,
  citizenship: String,
  degreeOfEducation: String,
  degreePercentage: Number,
  degreeStartDate: Date,
  degreeEndDate: Date,
  ieltsOverallScore: Number,
  ieltsListening: Number,
  ieltsReading: Number,
  ieltsWriting: Number,
  ieltsSpeaking: Number,
  ieltsDate: Date,
  greDate: Date,
  greScore: Number,
  toeflDate: Date,
  toeflScore: Number,
  educationGap: Boolean,
  educationGapDuration: Number,
  educationGapReason: String,
  workExperience: Boolean,
  jobDuration: Boolean,
  jobPosition: String,
  jobDescription: String,
  maritalStatus: String,
  dateOfMarriage: Date,
  spouseQualification: String,
  spouseEmploymentStatus: String,
  numberOfKids: Number,
  dependentsAccompanying: Number,
  userStatus: Boolean,
  whereDidYouHeardAboutUs: String
})

const UserModel = model('User', UserSchema)

export { UserModel }

/*

original userchema
===================
const UserSchema = new Schema({
  email: String,
  password: String,
  businessName: String,
  firstName: String,
  lastName: String,
  displayName: String,
  providerId: String,
  provider: String
})

 */