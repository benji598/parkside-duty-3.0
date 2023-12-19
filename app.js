'use strict';

const d = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const getDay = days[d.getDay()];

const insertCode = document.querySelector('#data');
const whatsapp = document.querySelector('.whatsapp-btn');
const find = document.querySelector('.whatsapp-cover-btn');
const sms = document.querySelector('.sms-btn');
const smsCover = document.querySelector('.sms-cover-btn');
const popUp = document.querySelector('.slide-pop-up');
const cancelBtn = document.querySelector('.cancel-btn');
const overlay = document.querySelector('.overlay');

const popUpName = document.querySelector('.pop-up-title');

const dayOfWeek = function (getDay) {
  const thursdayToSaturday = ['Thursday', 'Friday', 'Saturday'];
  const sundayToWednesday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday'];

  return thursdayToSaturday.includes(getDay) ? 'Sunday' : sundayToWednesday.includes(getDay) ? 'Thursday' : undefined; // or some default value or error handling
};

const pageTitle = document.querySelector('#duty').textContent;

const Person = class {
  constructor(firstName, lastName, number, duties, objName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.number = number;
    this.duties = duties;
    this.objName = objName;
  }

  closePopUp() {
    popUp.classList.remove('open');
    overlay.classList.remove('dark');
  }

  btnOption(el) {
    popUp.classList.add('open');
    overlay.classList.add('dark');
    this.popUp(el);

    find.addEventListener('click', () => {
      this.findCover(el);
      this.closePopUp();
    });

    whatsapp.addEventListener('click', () => {
      this.whatsApp(el);
      this.closePopUp();
    });

    sms.addEventListener('click', () => {
      this.sms(el);
      this.closePopUp();
    });

    smsCover.addEventListener('click', () => {
      this.smsCover(el);
      this.closePopUp();
    });

    cancelBtn.addEventListener('click', () => {
      this.closePopUp();
    });

    overlay.addEventListener('click', () => {
      this.closePopUp();
    });
  }

  popUp(el) {
    popUpName.innerHTML = `<p>Send Reminder to </p> <p>${el.firstName} ${el.lastName}</p>`;
  }

  createBtn(el) {
    if (el.duties.includes(pageTitle)) {
      const html = `<div class="name-holder"> ${el.firstName} ${el.lastName}</div >
      <button class="btn send-btn ${el.objName}"><span class="material-icons icon-circle">send</button>`;

      insertCode.insertAdjacentHTML('beforeend', html);
      insertCode.querySelector(`.${el.objName} `).addEventListener('click', () => el.btnOption(el));
    }
  }

  sms(el) {
    window.location.assign(
      `sms:${el.number}?&body=Reminder!%0aHello ${
        el.firstName
      }, You are scheduled for %0a${pageTitle} on ${dayOfWeek()}, Please let me know if you can NOT cover the duty. Thanks.`
    );
  }

  smsCover(el) {
    window.location.assign(
      `sms:${el.number}?&body=Cover Needed!%0aHello ${
        el.firstName
      }, Would you be available to cover ${pageTitle} on ${dayOfWeek()}, Please let me know if you are able to stand in. Thanks.`
    );
  }

  whatsApp(el) {
    window.location.assign(
      `whatsapp://send?phone= ${el.number} &text=*Reminder!*%0aHello ${
        el.firstName
      }, You are scheduled for %0a*${pageTitle}* on *${dayOfWeek()}*, Please let me know if you can *NOT* cover the duty. Thanks.`
    );
  }

  findCover(el) {
    window.location.assign(
      `whatsapp://send?phone= ${el.number} &text=*Cover Needed!*%0aHello ${
        el.firstName
      }, Would you be available to cover *${pageTitle}* on *${dayOfWeek()}*, Please let me know if you are able to stand in. Thanks.`
    );
  }
};

const broArr = [
  new Person(
    'Stuart',
    'Mclean',
    +447912251600,
    ['Platform', 'Auditorium Attendant', 'Entrance Attendant', 'Zoom Attendant', 'BS Reader', 'WT Reader', 'Roving Mic'],
    'stuartMclean'
  ),

  new Person(
    'Jason',
    'Thould',
    +447500695733,
    ['Platform', 'Auditorium Attendant', 'Entrance Attendant', 'BS Reader', 'Zoom Attendant', 'Roving Mic'],
    'jasonThould'
  ),

  new Person(
    'Thomas',
    'Beecham',
    +447812822824,
    ['Chairman', 'Platform', 'Auditorium Attendant', 'Entrance Attendant', 'Zoom Attendant', 'WT Reader', 'BS Reader', 'Roving Mic'],
    'thomasBeecham'
  ),

  new Person('Luke', 'Channon', +447812156813, [''], 'lukeChannon'),

  new Person(
    'Dan',
    'Dawson',
    +447725263218,
    ['Platform', 'Sound Box', 'Zoom Attendant', 'WT Reader', 'BS Reader', 'Roving Mic'],
    'danDawson'
  ),

  new Person('Stewart', 'Webster', +447484835804, ['Platform', 'Roving Mic'], 'stewartWebster'),

  new Person(
    'James',
    'Gray',
    +447596778479,
    ['Platform', 'Sound Box', 'Auditorium Attendant', 'Entrance Attendant', 'Zoom Attendant', 'WT Reader', 'BS Reader', 'Roving Mic'],
    'jamesGray'
  ),

  new Person(
    'Ben',
    'Hewart',
    +447913651484,
    ['Platform', 'Sound Box', 'Auditorium Attendant', 'Entrance Attendant', 'Zoom Attendant', 'WT Reader', 'BS Reader', 'Roving Mic'],
    'benHewart'
  ),

  new Person(
    'Jesse',
    'Oguntimehin',
    +447398914836,
    ['Chairman', 'Auditorium Attendant', 'Entrance Attendant', 'WT Reader', 'BS Reader', 'Roving Mic'],
    'jesseOguntimehin'
  ),

  new Person('Rod', 'Lister', +447530067140, ['WT Reader', 'BS Reader'], 'rodLister'),

  new Person(
    'Liam',
    'Summerfield',
    +447852810752,
    ['Platform', 'Sound Box', 'Auditorium Attendant', 'Entrance Attendant', 'BS Reader', 'Zoom Attendant', 'Roving Mic'],
    'liamSummerfield'
  ),

  new Person(
    'Bill ',
    'Summerfield',
    +447486620286,
    ['Chairman', 'Auditorium Attendant', 'Entrance Attendant', 'WT Reader'],
    'billSummerfield'
  ),

  new Person('Joseph', 'Kelly', +447895479322, ['Platform', 'Roving Mic'], 'josephRoper'),

  new Person(
    'James',
    'Summerfield',
    +447967819574,
    ['Auditorium Attendant', 'Entrance Attendant', 'Sound Box', 'Chairman', 'Hall Cleaning'],
    'jamesSummerfield'
  ),

  new Person('Ian', 'Frampton', +447720896922, [''], 'ianFrampton'),

  new Person('Johnathan', 'Chadburn', +447484637722, ['Roving Mic'], 'johnathanChadburn'),

  new Person(
    'Chris',
    'Cook',
    +447900675604,
    ['Auditorium Attendant', 'Entrance Attendant', 'Zoom Attendant', 'Platform', 'Roving Mic'],
    'chrisCook'
  ),

  new Person('Geoff', 'Thould', +447768092470, ['Roving Mic'], 'geoffThould'),

  // new Person(
  //   'Yorick',
  //   'de Munnik',
  //   +447851595413,
  //   ['Platform', 'Sound Box', 'Auditorium Attendant', 'Zoom Attendant', 'WT Reader', 'BS Reader', 'Roving Mic'],
  //   'yorickDeMunnik'
  // )

  new Person(
    'Andrew',
    'Robinson',
    +447740354219,
    [
      'Chairman',
      'Platform',
      'Auditorium Attendant',
      'Entrance Attendant',
      'Zoom Attendant',
      'Sound Box',
      'WT Reader',
      'BS Reader',
      'Roving Mic',
      'Hall Cleaning',
    ],
    'andrewRobinson'
  ),

  new Person(
    'Brian',
    'Robinson',
    +447956768956,
    ['Chairman', 'Auditorium Attendant', 'Entrance Attendant', 'Platform', 'WT Reader'],
    'brianRobsinson'
  ),

  new Person('John', 'Bell', +447799794942, ['Hall Cleaning', 'Auditorium Attendant', 'Entrance Attendant'], 'johnBell'),

  new Person(
    'Karl',
    'Boden',
    +447905000609,
    [
      'Chairman',
      'Platform',
      'Sound Box',
      'WT Reader',
      'BS Reader',
      'Auditorium Attendant',
      'Entrance Attendant',
      'Zoom Attendant',
      'Hall Cleaning',
    ],
    'karlBoden'
  ),

  new Person(
    'John',
    'Dawson',
    +447463386672,
    ['Chairman', 'Platform', 'Auditorium Attendant', 'Entrance Attendant', 'Zoom Attendant', 'WT Reader', 'BS Reader', 'Roving Mic'],
    'johnDawson'
  ),

  new Person('Jez', 'SinClair', +447788232490, ['Platform', 'Zoom Attendant', 'WT Reader', 'BS Reader', 'Roving Mic'], 'jezSinClair'),
];

broArr.sort((a, b) => a.firstName.localeCompare(b.firstName));

broArr.forEach((el) => {
  el.createBtn(el);
});
