const usersInDB = [{
  uid: '44e44268-dce8-4902-b662-1b34d2c10b8e',
  name: 'Merrill',
  email: 'merrillblankenship@quotezart.com',
  password: '$2b$10$tpSgrH4jeG7tIYLAlG7puOYxYeo1YBoo0fIb/RYs0tIFfABodjj96',
  role: 'user'
},
{
  uid: 'a0ece5db-cd14-4f21-812f-966633e7be86',
  name: 'Britney',
  email: 'britneyblankenship@quotezart.com',
  password: '$2b$10$bsR5PD4EyEjmw3WhCqGHdObaxOwRzavZlfZPU9DeTzybcHSGNuqgm',
  role: 'admin'
},
{
  uid: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
  name: 'Manning',
  email: 'manningblankenship@quotezart.com',
  password: '$2b$10$RQSkmBwMM6rY2Siu0PQpeO.S0F/O6lXZ7Lf1WQzbvtJJlxhgfluCG',
  role: 'admin'
}];

const policyInDB = [{
  pid: '64cceef9-3a01-49ae-a23b-3761b604800b',
  amountInsured: 1825.89,
  email: "inesblankenship@quotezart.com",
  inceptionDate: "2016-06-01T03:33:32.000Z",
  installmentPayment: true,
  clientId: "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
},
{  
  pid: '7b624ed3-00d5-4c1b-9ab8-c265067ef58b',
  amountInsured: 399.89,
  email:'inesblankenship@quotezart.com',
  inceptionDate:'2015-07-06T06:55:49Z',
  installmentPayment: true,
  clientId:'a0ece5db-cd14-4f21-812f-966633e7be86'
},
{  
  pid:'56b415d6-53ee-4481-994f-4bffa47b5239',
  amountInsured: 2301.98,
  email: 'inesblankenship@quotezart.com',
  inceptionDate:'2014-12-01T05:53:13Z',
  installmentPayment:false,
  clientId:'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'
},
{  
  pid:'6f514ec4-1726-4628-974d-20afe4da130c',
  amountInsured:697.04,
  email:'inesblankenship@quotezart.com',
  inceptionDate:'2014-09-12T12:10:23Z',
  installmentPayment:false,
  clientId:'a0ece5db-cd14-4f21-812f-966633e7be86'
},
{  
  id:'25202f31-fff0-481c-acfd-1f3ff2a9bcbe',
  amountInsured:2579.16,
  email:'inesblankenship@quotezart.com',
  inceptionDate:'2016-05-03T04:58:48Z',
  installmentPayment:false,
  clientId:'a0ece5db-cd14-4f21-812f-966633e7be86'
},
{  
  pid:'15b4430d-96f8-468e-98c0-3caaf8b0b3b6',
  amountInsured: 645.65,
  email:'inesblankenship@quotezart.com',
  inceptionDate:'2016-01-15T02:56:48Z',
  installmentPayment:true,
  clientId:'a0ece5db-cd14-4f21-812f-966633e7be86'
},
{  
  pid:'5a72ae47-d077-4f74-9166-56a6577e31b9',
  amountInsured:751.67,
  email:'inesblankenship@quotezart.com',
  inceptionDate:'2015-08-05T04:05:01Z',
  installmentPayment:true,
  clientId:'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'
},
{  
  pid:'4a582500-fab6-4efe-ae89-0c9ed750d0c7',
  amountInsured:3074.24,
  email:'inesblankenship@quotezart.com',
  inceptionDate:'2014-06-24T09:21:06Z',
  installmentPayment:false,
  clientId:'a0ece5db-cd14-4f21-812f-966633e7be86'
},
{  
  pid:'3a774f4e-0e70-488f-ac9f-ee211c8d5ece',
  amountInsured:1930.01,
  email:'inesblankenship@quotezart.com',
  inceptionDate:'2016-10-01T09:19:32Z',
  installmentPayment:true,
  clientId:'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'
}]

const numPoliciesMerrill = 0;
const numPoliciesBritney = 5;

const tokenInvalid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const tokenUserValid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NGU0NDI2OC1kY2U4LTQ5MDItYjY2Mi0xYjM0ZDJjMTBiOGUiLCJpYXQiOjE1NDQwMTk5MDV9.CRwAUqU8rZt1j59HqE2hiGcBapVpW8dRnhDccAFyCi0';
const tokenAdminValid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMGVjZTVkYi1jZDE0LTRmMjEtODEyZi05NjY2MzNlN2JlODYiLCJpYXQiOjE1NDQwMTk5NDF9.D9OR-tqODOdjKzyR5ase9dijWENOM6VYuY2TDMXqhLk';

const replyUsers = {
  "clients":[  
    {  
      "id":"a0ece5db-cd14-4f21-812f-966633e7be86",
      "name":"Britney",
      "email":"britneyblankenship@quotezart.com",
      "role":"admin"
    },
    {  
      "id":"e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
      "name":"Manning",
      "email":"manningblankenship@quotezart.com",
      "role":"admin"
    },
    {  
      "id":"a3b8d425-2b60-4ad7-becc-bedf2ef860bd",
      "name":"Barnett",
      "email":"barnettblankenship@quotezart.com",
      "role":"user"
    }
  ]
};

const replyPolicies = {
  "policies":[  
     {  
        "id":"64cceef9-3a01-49ae-a23b-3761b604800b",
        "amountInsured":1825.89,
        "email":"inesblankenship@quotezart.com",
        "inceptionDate":"2016-06-01T03:33:32Z",
        "installmentPayment":true,
        "clientId":"e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
     },
     {  
        "id":"7b624ed3-00d5-4c1b-9ab8-c265067ef58b",
        "amountInsured":399.89,
        "email":"inesblankenship@quotezart.com",
        "inceptionDate":"2015-07-06T06:55:49Z",
        "installmentPayment":true,
        "clientId":"a0ece5db-cd14-4f21-812f-966633e7be86"
     },
     {  
        "id":"56b415d6-53ee-4481-994f-4bffa47b5239",
        "amountInsured":2301.98,
        "email":"inesblankenship@quotezart.com",
        "inceptionDate":"2014-12-01T05:53:13Z",
        "installmentPayment":false,
        "clientId":"e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
     },
     {  
        "id":"6f514ec4-1726-4628-974d-20afe4da130c",
        "amountInsured":697.04,
        "email":"inesblankenship@quotezart.com",
        "inceptionDate":"2014-09-12T12:10:23Z",
        "installmentPayment":false,
        "clientId":"a0ece5db-cd14-4f21-812f-966633e7be86"
     },
     {  
        "id":"25202f31-fff0-481c-acfd-1f3ff2a9bcbe",
        "amountInsured":2579.16,
        "email":"inesblankenship@quotezart.com",
        "inceptionDate":"2016-05-03T04:58:48Z",
        "installmentPayment":false,
        "clientId":"a0ece5db-cd14-4f21-812f-966633e7be86"
     },
     {  
        "id":"15b4430d-96f8-468e-98c0-3caaf8b0b3b6",
        "amountInsured":645.65,
        "email":"inesblankenship@quotezart.com",
        "inceptionDate":"2016-01-15T02:56:48Z",
        "installmentPayment":true,
        "clientId":"a0ece5db-cd14-4f21-812f-966633e7be86"
     },
     {  
        "id":"5a72ae47-d077-4f74-9166-56a6577e31b9",
        "amountInsured":751.67,
        "email":"inesblankenship@quotezart.com",
        "inceptionDate":"2015-08-05T04:05:01Z",
        "installmentPayment":true,
        "clientId":"e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
     },
     {  
        "id":"4a582500-fab6-4efe-ae89-0c9ed750d0c7",
        "amountInsured":3074.24,
        "email":"inesblankenship@quotezart.com",
        "inceptionDate":"2014-06-24T09:21:06Z",
        "installmentPayment":false,
        "clientId":"a0ece5db-cd14-4f21-812f-966633e7be86"
     },
     {  
        "id":"3a774f4e-0e70-488f-ac9f-ee211c8d5ece",
        "amountInsured":1930.01,
        "email":"inesblankenship@quotezart.com",
        "inceptionDate":"2016-10-01T09:19:32Z",
        "installmentPayment":true,
        "clientId":"e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
     }
  ]
};

module.exports ={
  usersInDB,
  policyInDB,
  numPoliciesMerrill,
  numPoliciesBritney,
  tokenInvalid,
  tokenUserValid,
  tokenAdminValid,
  replyUsers,
  replyPolicies
}