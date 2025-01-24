//====================================================
//Click -> Main part of website
function enterWebsite() {
    window.location.href = "../main/index.html"; // Updated link to the main section.
}
//====================================================
//Hover -> skull transition

//Fade in yskull
document.getElementById('bottom-splat').addEventListener('mouseover', function(){
    document.body.classList.add('open-door');
    document.getElementById('enter-text').textContent = 'enter.';
    const yellowSkull = document.querySelector('#skull-icons .yellow-skull');
    yellowSkull.style.opacity = '1';
});
//Fade out yskull
document.getElementById('bottom-splat').addEventListener('mouseout', function(){
    document.body.classList.remove('open-door');
    document.getElementById('enter-text').textContent = 'enter?';
    const yellowSkull = document.querySelector('#skull-icons .yellow-skull');
    yellowSkull.style.opacity = '0';
});
//====================================================