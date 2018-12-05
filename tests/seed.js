usersInDB = [{
  uid: '44e44268-dce8-4902-b662-1b34d2c10b8e',
  name: 'Merrill',
  email: 'merrillblankenship@quotezart.com',
  password: 'Merrill',
  role: 'user'
},
{
  uid: 'a0ece5db-cd14-4f21-812f-966633e7be86',
  name: 'Britney',
  email: 'britneyblankenship@quotezart.com',
  password: 'Britney',
  role: 'admin'
},
{
  uid: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
  name: 'Manning',
  email: 'manningblankenship@quotezart.com',
  password: 'Manning',
  role: 'admin'
}];

policyInDB = {
  pid: '64cceef9-3a01-49ae-a23b-3761b604800b',
  amountInsured: 1825.89,
  email: "inesblankenship@quotezart.com",
  inceptionDate: "2016-06-01T03:33:32.000Z",
  installmentPayment: true,
  clientId: "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
}
const numPoliciesMerrill = 0;
const numPoliciesBritney = 102;

tokenInvalid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
tokenUserValid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NGU0NDI2OC1kY2U4LTQ5MDItYjY2Mi0xYjM0ZDJjMTBiOGUiLCJpYXQiOjE1NDQwMTk5MDV9.CRwAUqU8rZt1j59HqE2hiGcBapVpW8dRnhDccAFyCi0';
tokenAdminValid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMGVjZTVkYi1jZDE0LTRmMjEtODEyZi05NjY2MzNlN2JlODYiLCJpYXQiOjE1NDQwMTk5NDF9.D9OR-tqODOdjKzyR5ase9dijWENOM6VYuY2TDMXqhLk';
module.exports ={
  usersInDB,
  policyInDB,
  numPoliciesMerrill,
  numPoliciesBritney,
  tokenInvalid,
  tokenUserValid,
  tokenAdminValid
}