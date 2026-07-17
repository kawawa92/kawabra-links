'use strict';

const buttonItems = [
  { id: 'battle', label: '決戦', url: 'https://g12010355.sp.pf.mbga.jp/?url=https%3A%2F%2Fmbga-sp.daisenran.jp%2Fbattle%2Fbattle_top.aspx%3Frnd%3D446717&guid=ON', defaultIndex: 41 },
  { id: 'recovery', label: '回復', url: 'http://sp.pf.mbga.jp/12010355/?url=https%3A%2F%2Fmbga-sp.daisenran.jp%2Fbattle%2Fability_execute.ashx%3Faid%3D30%26jid%3D4008002%26rnd%3D438135&guid=ON', defaultIndex: 42 },
  { id: 'normal-attack', label: '通常攻撃', url: 'http://sp.pf.mbga.jp/12010355/?url=https%3A%2F%2Fmbga-sp.daisenran.jp%2Fbattle%2Fability_execute.ashx%3Faid%3D10%26jid%3D4008002%26rnd%3D438135&guid=ON', defaultIndex: 43 },
  { id: 'bow', label: '弓', url: 'http://sp.pf.mbga.jp/12010355/?guid=ON&url=https%3A%2F%2Fmbga-sp.daisenran.jp%2Fbattle%2Fability_execute.ashx%3Faid%3D50%26gnum%3D10&guid=ON', defaultIndex: 44 },
  { id: 'support', label: '応援', url: 'http://sp.pf.mbga.jp/12010355/?guid=ON&url=https%3A%2F%2Fmbga-sp.daisenran.jp%2Fbattle%2Fability_execute.ashx%3Faid%3D20%26gnum%3D10&guid=ON', defaultIndex: 45 },
  { id: 'duty', label: '任務', url: 'http://g12010355.sp.pf.mbga.jp/?url=https%3A%2F%2Fmbga-sp.daisenran.jp%2Fapi%2Fduty_start.ashx%3Fdi%3D811%26rnd%3D137405&guid=ON', defaultIndex: 46 },
  { id: 'gacha-10', label: 'ガチャ10枚', url: 'https://g12010355.sp.pf.mbga.jp/?url=https%3A%2F%2Fmbga-sp.daisenran.jp%2Fgacha%2Fgacha_execute_continue_rare.ashx%3Fgid%3D201%26rnd%3D947553&guid=ON', defaultIndex: 47 },
];

function makeDestinations() {
  const destinations = [];
  for (let index = 1; index <= 20; index += 1) destinations.push({ index, label: `左${index}` });
  for (let index = 1; index <= 20; index += 1) destinations.push({ index: 20 + index, label: `右${index}` });
  for (let index = 1; index <= 16; index += 1) destinations.push({ index: 40 + index, label: `下${index}` });
  return destinations;
}

const destinations = makeDestinations();

function createDeepLink(item, selectedIndex) {
  if (!Number.isInteger(selectedIndex) || selectedIndex < 1 || selectedIndex > 56) return null;
  return `sanbato://apply?index=${selectedIndex}` +
    `&url=${encodeURIComponent(item.url)}` +
    `&label=${encodeURIComponent(item.label)}`;
}

function createDestinationOptions(selectedIndex) {
  const groups = [
    { label: '左ボタン', values: destinations.slice(0, 20) },
    { label: '右ボタン', values: destinations.slice(20, 40) },
    { label: '下ボタン', values: destinations.slice(40) },
  ];
  return groups.map((group) => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = group.label;
    group.values.forEach((destination) => {
      const option = document.createElement('option');
      option.value = String(destination.index);
      option.textContent = destination.label;
      option.selected = destination.index === selectedIndex;
      optgroup.append(option);
    });
    return optgroup;
  });
}

function renderCard(item) {
  const card = document.createElement('article');
  card.className = 'button-card';

  const main = document.createElement('div');
  main.className = 'card-main';

  const title = document.createElement('h2');
  title.textContent = item.label;
  main.append(title);

  const select = document.createElement('select');
  select.setAttribute('aria-label', `${item.label}の登録先`);
  createDestinationOptions(item.defaultIndex).forEach((group) => select.append(group));
  main.append(select);

  const registerButton = document.createElement('button');
  registerButton.className = 'register-button';
  registerButton.type = 'button';
  registerButton.textContent = '登録';
  main.append(registerButton);

  const details = document.createElement('details');
  const summary = document.createElement('summary');
  summary.textContent = '詳細';
  const url = document.createElement('p');
  url.className = 'url-detail';
  url.textContent = item.url;
  details.append(summary, url);
  main.append(details);

  card.append(main);

  const status = document.createElement('p');
  status.className = 'status';
  status.setAttribute('role', 'status');
  registerButton.addEventListener('click', () => {
    const selectedIndex = Number(select.value);
    const deepLink = createDeepLink(item, selectedIndex);
    if (!deepLink) {
      status.textContent = '登録先が不正なため、起動できません。';
      return;
    }
    status.textContent = `${item.label}を${select.selectedOptions[0].textContent}へ登録します。`;
    window.location.href = deepLink;
  });
  card.append(status);
  return card;
}

const buttonList = document.querySelector('#button-list');
buttonItems.forEach((item) => buttonList.append(renderCard(item)));

if (typeof module !== 'undefined') module.exports = { buttonItems, destinations, createDeepLink };
