<!-- <label
   for="toogleTwo"
   class="flex items-center cursor-pointer select-none text-dark dark:text-white"
   >
   <div class="relative">
      <input
         id="toogleTwo"
         type="checkbox"
         class="peer sr-only"
         />
      <div
         class="h-5 rounded-full shadow-inner bg-gray-100 dark:bg-dark-2 w-14"
         ></div>
      <div
         class="absolute left-0 transition bg-white rounded-full dot shadow-switch-1 dark:bg-dark-4 -top-1 h-7 w-7 peer-checked:translate-x-full peer-checked: bg-red-800"
         ></div>
   </div>
</label> -->


<label class="relative inline-flex cursor-pointer items-center">
    <input id="switch" type="checkbox" class="peer sr-only" />
    <label for="switch" class="hidden"></label>
    <div class="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
</label>