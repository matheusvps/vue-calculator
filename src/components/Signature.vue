<template>
    <div class="animate-character">
    Proof of Concepts - Matheus Passos
    </div>

  </template>

  <style scoped>
  .animate-character
{
    background-image: linear-gradient(
      -225deg,
      #000000 0%,
      #00ff1e 29%,
      #000000 67%,
      #37ff00 100%
    );
    background-size: auto auto;
    background-clip: border-box;
    background-size: 200% auto;
    color: #fff;
    background-clip: text;
    text-emphasis-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textclip 4s linear infinite;
    display: inline-block;
    font-size: 10px;
    text-align: center !important;
  }

  @keyframes textclip {
    to {
      background-position: 200% center;
    }
  }
  </style>
