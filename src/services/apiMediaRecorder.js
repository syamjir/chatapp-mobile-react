// mediaRecorder.js
let mediaRecorder = null;
let audioChunks = [];

// Start recording
export const startRecording = async () => {
  audioChunks = []; // Clear previous recordings
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  mediaRecorder.start();
};

// Stop recording
export const stopRecording = () => {
  return new Promise((resolve, reject) => {
    if (mediaRecorder) {
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        resolve(audioBlob);
      };
      mediaRecorder.stop();
    } else {
      reject(new Error("MediaRecorder not initialized"));
    }
  });
};
