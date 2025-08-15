<script lang="ts">
  import Tag from './Tag.svelte';
  import type { Status } from '../types/tags';

  export let status: Status = 'progress';

  const statusConfig = {
    completed: {
      icon: 'check_circle',
      text: 'Completed',
      textColor: 'rgb(86, 240, 0)',
      backgroundColor: 'rgba(86, 240, 0, 0.1)',
    },
    progress: {
      icon: 'build_circle',
      text: 'In Progress',
      textColor: 'rgb(255, 179, 2)',
      backgroundColor: 'rgba(255, 179, 2, 0.1)',
    },
    hold: {
      icon: 'pause_circle',
      text: 'On Hold',
      textColor: 'rgb(164,171,182)',
      backgroundColor: 'rgba(164,171,182, 0.1)',
    },
    cancelled: {
      icon: 'cancel',
      text: 'Cancelled',
      textColor: 'rgb(255, 56, 56)',
      backgroundColor: 'rgba(255, 56, 56, 0.1)',
    },
  };

  $: config = statusConfig[status] || statusConfig['progress'];
</script>

<Tag
  icon={config.icon}
  text={config.text}
  textColor={config.textColor}
  backgroundColor={config.backgroundColor}
  iconType="material"
/>
