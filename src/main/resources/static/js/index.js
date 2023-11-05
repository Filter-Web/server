document.addEventListener("DOMContentLoaded", () => {
    new App();
})

class App {
    constructor() {

        const video = document.getElementById('cameraview');

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then( (stream) => { // function 의 this와 화살표 함수의 this 가 다름
                    video.srcObject = stream;
                })
                .catch(function (error) {
                    console.log("Something went wrong!");
                    console.log(error);
                    return;
                });
        }

        video.addEventListener( "loadedmetadata", () => {
            window.requestAnimationFrame(this.draw.bind(this));
        });
    }

    draw(t) {

        window.requestAnimationFrame(this.draw.bind(this));

        const canvas = document.getElementById('canvas');
        const canvas2 = document.getElementById('canvas2');
        const video = document.getElementById('cameraview');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        const ctx2 = canvas2.getContext('2d');

        ctx.font = '20px serif';

        ctx.fillText('비디오 로딩 중..', canvas.width / 2, canvas.height / 2);
        ctx.translate(video.videoWidth, 0);
        ctx.scale(-1,1);
        ctx.drawImage(video, 0, 0,
            video.videoWidth,
            video.videoHeight);

        const img = document.createElement('img');
        img.src = '/images/test.png';
        img.addEventListener('load', () => {
            ctx.drawImage(img, 100, 100, 100, 100); // 그릴 이미지 엘리먼트, x, y, width ,height
            ctx2.drawImage(img, 100, 100, 100, 100); // 그릴 이미지 엘리먼트, x, y, width ,height
        });

        ctx2.fillText('비디오 로딩 중..', canvas.width / 2, canvas.height / 2);
    }
}