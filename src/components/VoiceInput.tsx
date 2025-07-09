import React, { useState, useRef } from 'react';
import { Mic, MicOff, Play, Pause, Square } from 'lucide-react';

export const VoiceInput: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [processing, setProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(url);
      audioRef.current.play();
      setIsPlaying(true);
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      };
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const processAudio = async () => {
    setProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTranscript("I bought rice for ₹70, milk for ₹45, and bread for ₹30 from the local grocery store today.");
    setProcessing(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Voice Input</h2>
        <p className="text-gray-600">Record your receipt details using voice</p>
      </div>

      {/* Recording Interface */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className={`
              p-8 rounded-full transition-all duration-300
              ${isRecording 
                ? 'bg-red-500 animate-pulse' 
                : 'bg-blue-500 hover:bg-blue-600'
              }
            `}>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className="text-white"
              >
                {isRecording ? (
                  <MicOff className="w-12 h-12" />
                ) : (
                  <Mic className="w-12 h-12" />
                )}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {isRecording ? 'Recording...' : 'Tap to Record'}
            </h3>
            <p className="text-gray-600 mt-1">
              {isRecording 
                ? 'Speak clearly about your purchase' 
                : 'Start recording your receipt details'
              }
            </p>
          </div>

          {isRecording && (
            <div className="flex justify-center">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-8 bg-red-500 rounded-full animate-pulse"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '1s'
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Audio Playback */}
      {audioBlob && (
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recorded Audio</h3>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={isPlaying ? pauseAudio : playAudio}
              className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            
            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full w-0 transition-all duration-300" />
              </div>
            </div>
            
            <button
              onClick={processAudio}
              disabled={processing}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50"
            >
              {processing ? 'Processing...' : 'Process Audio'}
            </button>
          </div>
        </div>
      )}

      {/* Transcript */}
      {transcript && (
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transcript</h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{transcript}</p>
          
          <div className="mt-4 flex justify-end">
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
              Save Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};