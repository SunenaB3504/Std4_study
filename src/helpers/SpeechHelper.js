/**
 * A utility class for handling text-to-speech functionality
 */
export class SpeechHelper {
  constructor() {
    this.voiceOptions = [];
    this.selectedVoice = null;
    this.rate = 1.0;
    this.pitch = 1.0;
    this.volume = 1.0;
    
    // Initialize voice options when speech synthesis is available
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Wait for voices to be loaded
      window.speechSynthesis.onvoiceschanged = () => {
        this.voiceOptions = window.speechSynthesis.getVoices();
        // Try to select a child-friendly voice by default if available
        this.selectedVoice = this.voiceOptions.find(voice => 
          voice.name.includes('Kid') || 
          voice.name.includes('Child') || 
          voice.name.includes('Female')
        ) || this.voiceOptions[0];
      };
      
      // In case voices are already loaded
      if (window.speechSynthesis.getVoices().length > 0) {
        this.voiceOptions = window.speechSynthesis.getVoices();
        this.selectedVoice = this.voiceOptions.find(voice => 
          voice.name.includes('Kid') || 
          voice.name.includes('Child') || 
          voice.name.includes('Female')
        ) || this.voiceOptions[0];
      }
    }
  }
  
  /**
   * Speak the given text using the selected voice
   * @param {string} text - The text to speak
   * @param {Object} options - Options for speech (rate, pitch, voice)
   * @returns {Promise} A promise that resolves when speech is finished
   */
  speak(text, options = {}) {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject('Speech synthesis not supported');
        return;
      }
      
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply options
      utterance.voice = options.voice || this.selectedVoice;
      utterance.rate = options.rate || this.rate;
      utterance.pitch = options.pitch || this.pitch;
      utterance.volume = options.volume || this.volume;
      
      // Handle events
      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);
      
      // Start speaking
      window.speechSynthesis.speak(utterance);
    });
  }
  
  /**
   * Stop any ongoing speech
   */
  stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
  
  /**
   * Pause the speech
   */
  pause() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }
  
  /**
   * Resume paused speech
   */
  resume() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  }
  
  /**
   * Get all available voices
   * @returns {Array} Array of SpeechSynthesisVoice objects
   */
  getVoices() {
    return this.voiceOptions;
  }
  
  /**
   * Set the speech rate
   * @param {number} rate - Rate from 0.1 to 10
   */
  setRate(rate) {
    this.rate = Math.max(0.1, Math.min(10, rate));
  }
  
  /**
   * Set the speech pitch
   * @param {number} pitch - Pitch from 0 to 2
   */
  setPitch(pitch) {
    this.pitch = Math.max(0, Math.min(2, pitch));
  }
  
  /**
   * Set the speech volume
   * @param {number} volume - Volume from 0 to 1
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }
  
  /**
   * Set the voice by name or index
   * @param {string|number} voiceIdentifier - Voice name or index
   * @returns {boolean} Whether the voice was successfully set
   */
  setVoice(voiceIdentifier) {
    if (typeof voiceIdentifier === 'number') {
      if (voiceIdentifier >= 0 && voiceIdentifier < this.voiceOptions.length) {
        this.selectedVoice = this.voiceOptions[voiceIdentifier];
        return true;
      }
    } else if (typeof voiceIdentifier === 'string') {
      const voice = this.voiceOptions.find(v => v.name === voiceIdentifier);
      if (voice) {
        this.selectedVoice = voice;
        return true;
      }
    }
    return false;
  }
}

// Export a singleton instance
const speechHelper = new SpeechHelper();
export default speechHelper;
