<template> 
    <div class="notification">
        <div class="text">{{ text }}</div>
        <div class="time">{{ time }}</div>
    </div>
</template>

<script>
export default {
    name: "Notification",
    props: [
        "text",
        "time"
    ],
  };
</script>
  
