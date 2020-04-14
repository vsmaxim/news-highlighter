// Test page: https://meduza.io/news/2020/04/14/kolichestvo-umershih-ot-koronavirusnoy-infektsii-v-moskve-vyroslo-do-95-chelovek

const partsToHighlight = [
    `имели сопутствующие заболевания. Среди них — хронический бронхит,`,
    `в ближайшие две-три недели в городе возникнет дефицит мест в больницах`,
];

let body = document.getElementsByTagName('body')[0];

for (let part of partsToHighlight) {
    let innerHTML = body.innerHTML.replace(/&nbsp;/g, " ");
    let index = innerHTML.indexOf(part);

    if (index >= 0) {
        let leftPart = innerHTML.substring(0, index);
        let textPart = innerHTML.substring(index, index + part.length);
        let rightPart = innerHTML.substring(index + part.length);

        body.innerHTML = `${leftPart}<span class="highlighted">${textPart}</span>${rightPart}`;
    }
}
