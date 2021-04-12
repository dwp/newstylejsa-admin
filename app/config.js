// Use this file to change prototype configuration.

// Note: prototype config can be overridden using environment variables (eg on heroku)

const TODAYS_DATE = new Date();
const AGENT_TYPES = [{
  type: 'CONTACT_CENTRE_AGENT',
  label: 'Contact centre agent'
}, {
  type: 'CONTACT_CENTRE_MANAGER',
  label: 'Contact centre manager'
}, {
  type: 'WORK_COACH_AGENT',
  label: 'Job centre agent (Work coach)'
}, {
  type: 'SERVICE_CENTRE_AGENT',
  label: 'Service centre agent'
/*}, {
  type: 'QUALITY_ASSURANCE_AGENT',
  label: 'Quality assurance agent'*/
}];

const CLAIM_STATUSES = {
  PUSHED: {
    label: 'Pushed',
    value: 'pushed',
    cta: 'Push'
  },
  NOT_PUSHED: {
    label: 'Not pushed',
    value: 'notPushed',
    cta: 'Not push'
  },
  PUSH_FAILED: {
    label: 'Push failed',
    value: 'pushFailed',
    cta: 'Fail to push'
  },
  NEW_CLAIM: {
    label: 'New claim',
    value: 'newClaim',
    cta: 'New claim'
  },
  PREVIEW: {
    label: 'Preview',
    value: 'preview',
    cta: 'Preview'
  },
  FIRST_FAIL: {
    label: 'First fail',
    value: 'firstFail',
    cta: 'First fail'
  },
  FINAL_FAIL: {
    label: 'Final fail',
    value: 'finalFail',
    cta: 'Final fail'
  },
  SUCCESS: {
    //label: 'Push successful',
    label: 'Success',
    value: 'success',
    cta: 'Success'
  },
  CLERICAL: {
    label: 'Clerical',
    value: 'clerical',
    cta: 'Clerical'
  },
  NO_SLOTS_AVAILABLE: {
    label: 'No slots available',
    value: 'noSlotsAvailable',
    cta: 'No slots available'
  },
  CANCELLED: {
    //label: 'Withdrawn',
    label: 'Withdraw claim',
    value: 'withdrawn',
    cta: 'Withdraw claim'
  },
  ALLOCATED: {
    label: 'Allocated',
    value: 'allocated',
    cta: 'Allocated'
  }
};

module.exports = {
  // Service name used in header. Eg: 'Renew your passport'
  serviceName: 'Apply for New Style Jobseeker’s Allowance',

  // Benefit name
  benefitName: '',

  // Default port that prototype runs on
  port: '3000',

  // Enable or disable password protection on production
  useAuth: 'true',

  // Automatically stores form data, and send to all views
  useAutoStoreData: 'true',

  // Enable or disable built-in docs and examples.
  useDocumentation: 'true',

  // Force HTTP to redirect to HTTPS on production
  useHttps: 'true',

  // Enable or disable Browser Sync
  useBrowserSync: 'true',

  // Today's date
  todaysDate: {
    original: TODAYS_DATE,
    year: TODAYS_DATE.getFullYear().toString(),
    month: TODAYS_DATE.getMonth().toString(),
    date: TODAYS_DATE.getDate().toString(),
    day: TODAYS_DATE.getDay().toString()
  },

  // Summary data
  summaryClaimantData: {
    claimant: {
      title: 'Mr',
      firstName: 'John',
      lastName: 'Doe',
      nino: 'QQ 12 34 56 D',
      dob: '19/11/1980',
      telephone: '01234 567890',
      address: {
        line1: '85, Sample Lane',
        line2: 'Sampletown',
        postcode: 'SA4 7SH'
      }
    },
    date: '24/09/2018',
    language: 'English',
    benefitCentre: 'Preston'
  },

  // Outbound claimant data
  outboundClaimantData: {
    claimant: {
      title: 'Mr',
      firstName: 'Marvin',
      lastName: 'Gordon',
      nino: 'QQ 12 34 56 D',
      dob: '24/03/1990',
      telephone: '0161 1234564',
      address: {
        line1: '85, Sample Lane',
        line2: 'Sampletown',
        postcode: 'SA4W 7SH'
      }
    },
    date: '17/09/2018',
    language: 'English',
    benefitCentre: 'London'
  },

  // Inbound claimant data
  inboundClaimantData: {
    claimant: {
      title: 'Mr',
      firstName: 'John',
      lastName: 'Doe',
      nino: 'QQ 12 34 56 D',
      dob: '24/03/1990',
      telephone: '0161 1234564',
      address: {
        line1: '85, Sample Lane',
        line2: 'Sampletown',
        postcode: 'SA4 7SH'
      }
    },
    date: '24/09/2018',
    language: 'English',
    benefitCentre: 'Manchester'
  },

  claimStatuses: [{
    label: CLAIM_STATUSES.NEW_CLAIM.label,
    value: CLAIM_STATUSES.NEW_CLAIM.value,
    cta: CLAIM_STATUSES.NEW_CLAIM.cta,
    excludeFromUpdate: true
  }, {
    label: CLAIM_STATUSES.PREVIEW.label,
    value: CLAIM_STATUSES.PREVIEW.value,
    cta: CLAIM_STATUSES.PREVIEW.cta,
    details: ['Too early 7-8am', 'Too early 8-9am','Too late 8-9pm', 'PV flag']
  }, {
    label: CLAIM_STATUSES.NO_SLOTS_AVAILABLE.label,
    value: CLAIM_STATUSES.NO_SLOTS_AVAILABLE.value,
    cta: CLAIM_STATUSES.NO_SLOTS_AVAILABLE.cta
  }, {
    label: CLAIM_STATUSES.FIRST_FAIL.label,
    value: CLAIM_STATUSES.FIRST_FAIL.value,
    cta: CLAIM_STATUSES.FIRST_FAIL.cta,
    details: ['Callback in 1hr', 'Callback in 2hrs', 'Callback in 3hrs', 'Fail to attend', 'Landline only', 'Wrong NiNO']
  }, {
    label: CLAIM_STATUSES.FINAL_FAIL.label,
    value: CLAIM_STATUSES.FINAL_FAIL.value,
    cta: CLAIM_STATUSES.FINAL_FAIL.cta,
    details: ['Voicemail if possible', 'No voicemail – Letter sent', 'Appointee Letter']
  }, {
    label: CLAIM_STATUSES.SUCCESS.label,
    value: CLAIM_STATUSES.SUCCESS.value,
    cta: CLAIM_STATUSES.SUCCESS.cta
  }, {
    label: CLAIM_STATUSES.CANCELLED.label,
    value: CLAIM_STATUSES.CANCELLED.value,
    cta: CLAIM_STATUSES.CANCELLED.cta,
    reasonRequired: true
  }],

  workCoachClaimStatuses: [{
    label: CLAIM_STATUSES.NOT_PUSHED.label,
    value: CLAIM_STATUSES.NOT_PUSHED.value
  }, {
    label: CLAIM_STATUSES.PUSHED.label,
    value: CLAIM_STATUSES.PUSHED.value
  }, {
    label: CLAIM_STATUSES.PUSH_FAILED.label,
    value: CLAIM_STATUSES.PUSH_FAILED.value
  }, {
    label: CLAIM_STATUSES.CLERICAL.label,
    value: CLAIM_STATUSES.CLERICAL.value
  }, {
    label: CLAIM_STATUSES.CANCELLED.label,
    value: CLAIM_STATUSES.CANCELLED.value
  }],

  // Logged in agent types
  agents: [{
    type: AGENT_TYPES[0].type,
    label: AGENT_TYPES[0].label,
    title: 'Mr',
    firstName: 'Eric',
    lastName: 'Dobson'
  }, {
    type: AGENT_TYPES[1].type,
    label: AGENT_TYPES[1].label,
    title: 'Ms',
    firstName: 'Jenny',
    lastName: 'Phillips'
  }, {
    type: AGENT_TYPES[2].type,
    label: AGENT_TYPES[2].label,
    title: 'Mrs',
    firstName: 'Amy',
    lastName: 'Blackwood'
  }, {
    type: AGENT_TYPES[3].type,
    label: AGENT_TYPES[3].label,
    title: 'Mr',
    firstName: 'Rob',
    lastName: 'Smiths'
  }],

  agentTypes: AGENT_TYPES,

  // Set to true to display a tag showing the logged in agent type
  debugLoggedInAgentType: true,

  CLAIM_STATUSES,

  CLAIMS_PER_PAGE: 100
}
