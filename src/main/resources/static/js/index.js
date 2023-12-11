const startWebcamStream = async () => {
    try {
        // 스트리밍 시작 버튼 숨기기
        toggleBtn(document.getElementById('startWebcamBtn'));

        // 스트리밍 중단 버튼 보이기
        toggleBtn(document.getElementById('stopWebcamBtn'));

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.getElementById('webcamVideo');
        video.srcObject = stream;

        // 비디오 메타데이터 로드를 기다림
        video.addEventListener('loadedmetadata', () => {
            // 비디오가 로드된 후에 캡처 시작
            captureFrameAndSend();
        });
    } catch (error) {
        console.error('Error accessing webcam:', error);
    }
};


const captureFrameAndSend = async () => {
    const video = document.getElementById('webcamVideo');

    // 비디오 크기 확인
    if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.warn('Video size is 0. Waiting for metadata.');
        return;
    }

    const canvas = document.getElementById('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = new Uint8Array(imageData.data);

    // 웹캠 영상 데이터를 Flask로 전송
    sendWebcamStream(data);

    // 반복 호출
    requestAnimationFrame(captureFrameAndSend);
};


const sendWebcamStream = async (webcamData) => {
    const url = 'http://localhost:5000/api/receiveWebcamStream';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            body: webcamData,
        });
        // const streamingVideo = document.getElementById('streamingVideo');
        // const reader = response.body.getReader();
        // let chunks = [];
        const canvas = document.getElementById('videoCanvas');
        const video = document.getElementById('webcamVideo');
        canvas.width = video.width;
        canvas.height = video.height;
        const context = canvas.getContext('2d');

        const imgArrayBuffer = await response.arrayBuffer();
        const imgUint8Array = new Uint8Array(imgArrayBuffer);
        const imgBlob = new Blob([imgUint8Array], { type: 'image/jpeg' });

        const blobUrl = URL.createObjectURL(imgBlob);

        // Canvas에 이미지 그리기
        const img = new Image();
        img.onload = function() {
            function drawImage() {
                context.drawImage(img, 0, 0);
                requestAnimationFrame(drawImage);
            }
            // 초기 호출
            drawImage();
        };
        img.src = blobUrl;

        if (!response.ok) {
            console.error('Error sending webcam stream:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending webcam stream:', error);
    }
};


const stopWebcam = async () => {
    const video = document.getElementById('webcamVideo');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => track.stop());
    video.srcObject = null;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // 스트리밍 시작 버튼 숨기기
    toggleBtn(document.getElementById('startWebcamBtn'));

    // 스트리밍 중단 버튼 보이기
    toggleBtn(document.getElementById('stopWebcamBtn'));
};

function toggleBtn(btn) {
    if(btn.style.display != 'none') {
        btn.style.display = 'none';
    }
    else {
        btn.style.display = 'inline';
    }
};