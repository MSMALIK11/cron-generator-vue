<template>
    <div className="well">   
        {{$parent.translate('Every')}}
        <select @change="onChange">
  <option v-for="number in 60" :key="number" :value="number">{{ number }}</option>
</select>
{{$parent.translate('Minutes')}}
    </div>
</template>
<script>

export default {
    props:['value'],
    methods: {
        onChange(e) {
            if((e.target.value > 0 && e.target.value < 60) || e.target.value === '') {
                let val = this.value;
                val[1] = e.target.value ? `0/${e.target.value}` : val[1];  
                this.$emit("change-val", val);
            }  
        }
    }
}
</script>
