<script lang="ts">
  import { Sun, Moon, Laptop } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';
  import { browser } from '$app/environment';

  let theme = $state(browser ? localStorage.getItem('theme') || 'system' : 'system');
  
  $effect(() => {
    if (!browser) return;
    
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.add(systemTheme);
      document.documentElement.classList.remove(systemTheme === 'dark' ? 'light' : 'dark');
    }
  });
</script>

<div class="flex gap-2">
  <Button 
    variant="ghost" 
    size="icon"
    class={cn("w-9 h-9", theme === 'light' && "bg-secondary/10")}
    on:click={() => theme = 'light'}
  >
    <Sun class="h-4 w-4" />
    <span class="sr-only">Light mode</span>
  </Button>
  
  <Button 
    variant="ghost"
    size="icon"
    class={cn("w-9 h-9", theme === 'dark' && "bg-secondary/10")}
    on:click={() => theme = 'dark'}
  >
    <Moon class="h-4 w-4" />
    <span class="sr-only">Dark mode</span>
  </Button>
  
  <Button 
    variant="ghost"
    size="icon"
    class={cn("w-9 h-9", theme === 'system' && "bg-secondary/10")}
    on:click={() => theme = 'system'}
  >
    <Laptop class="h-4 w-4" />
    <span class="sr-only">System theme</span>
  </Button>
</div> 