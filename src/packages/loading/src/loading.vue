<template>
  <transition name="sealui-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="sealui-loading-mask"
      :class="[
      customClass,
      {
      'is-fullscreen': fullscreen
      }]"
      :style="backgroundStyle">
      <div class="sealui-loading-spinner" :class="[
      color ? 'is-'+color : ''
      ]" v-if="type == 'spinner'" :style="spinnerStyle">
        <seal-icon :name="icon" v-if="icon && !img"></seal-icon>

        <div v-if="img" class="sealui-loading--img"></div>

        <svg class="circular" viewBox="25 25 50 50" v-if="!icon && !img">
          <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
        <p v-if="text" class="sealui-loading--text">{{ text }}</p>
      </div>

      <div class="sealui-loading-spinner" :class="[
      color ? 'is-'+color : ''
      ]" v-if="type == 'beat'"  :style="spinnerStyle">
      	<div class="sealui-loading-spinner__beat sealui-loading-spinner__beat--odd" :style="beatStyle"></div>
      	<div class="sealui-loading-spinner__beat sealui-loading-spinner__beat--even" :style="beatStyle"></div>
      	<div class="sealui-loading-spinner__beat sealui-loading-spinner__beat--odd" :style="beatStyle"></div>
      	<p v-if="text" class="sealui-loading--text">{{ text }}</p>
      </div>

      <div class="sealui-loading-spinner" :class="[
      color ? 'is-'+color : ''
      ]" v-if="type == 'scale'" :style="spinnerStyle">
      	<div class="sealui-loading-spinner__scale sealui-loading-spinner__scale--1" :style="scaleStyle"></div>
      	<div class="sealui-loading-spinner__scale sealui-loading-spinner__scale--2" :style="scaleStyle"></div>
      	<div class="sealui-loading-spinner__scale sealui-loading-spinner__scale--3" :style="scaleStyle"></div>
      	<div class="sealui-loading-spinner__scale sealui-loading-spinner__scale--4" :style="scaleStyle"></div>
      	<div class="sealui-loading-spinner__scale sealui-loading-spinner__scale--5" :style="scaleStyle"></div>
      	<p v-if="text" class="sealui-loading--text">{{ text }}</p>
    	</div>

			<div class="sealui-loading-spinner" :class="[
      color ? 'is-'+color : ''
      ]" v-if="type == 'moon'" :style="spinnerStyle">
      	<div class="sealui-loading-spinner__moon sealui-loading-spinner__moon--1" :style="beatStyle">
    			<div class="sealui-loading-spinner__moon sealui-loading-spinner__moon--2" :style="[moonStyle,moonStyle2]"></div>
    			<div class="sealui-loading-spinner__moon sealui-loading-spinner__moon--3" :style="[beatStyle,moonStyle3]"></div>
    		</div>
    		<p v-if="text" class="sealui-loading--text">{{ text }}</p>
    	</div>

    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
				text        : null,
				fullscreen  : true,
				visible     : false,
				customClass : '',
				color       : 'primary',
				icon        : '',
				img         : '',
				type        : '',
				size        : '',
      };
    },
    mounted(){
    	this.$nextTick(function(){
    		this.setImgLoadingClass()
    	})

    },
    methods: {
    	setImgLoadingClass (){
    		if(this.img){
	    		let _img = this.img;
	    		let styleBeforeSheets = `background:url(${_img}) no-repeat center center !important;background-size:80% !important`;
	    		document.styleSheets[0].addRule('.sealui-loading--img::before', styleBeforeSheets);
        	document.styleSheets[0].insertRule('.sealui-loading--img::before {'+styleBeforeSheets+'}', 0);
	    	}
    	},
      handleAfterLeave() {
        this.$emit('after-leave');
      },
      setText(text) {
        this.text = text;
      },
      setColor(color) {
        this.color = color;
      },
      setIcon(icon) {
        this.icon = icon;
      },
      setImg(img) {
        this.img = img;
      },
      setType(type) {
        this.type = type;
      },
      setSize(size) {
        this.size = size
      }
    },
    computed : {
    	spinnerStyle(){
    		return {
    			'margin-top' : -(this.size/2)+'px'
    		}
    	},
    	beatStyle() {
	    	return {
	      	height: this.size+'px',
	     		width: this.size+'px',
	      }
	    },
	    scaleStyle () {
	    	return {
	      	height: this.size+'px',
	     		width: this.size/10+'px',
	        display: 'inline-block',
	        animationName: 'v-scaleStretchDelay',
	        animationDuration: '1s',
	        animationIterationCount: 'infinite',
	        animationTimingFunction: 'cubic-bezier(.2,.68,.18,1.08)',
	        animationFillMode: 'both'
	      }
      },
      backgroundStyle (){
        if(this.background){
          return {
            background : this.background
          }
        }
      },
      moonSize() {
	      return parseFloat(this.size)/7
	    },
      moonStyle () {
	      return {
	        height: this.moonSize  + 'px',
	        width: this.moonSize  + 'px'
	      }
	    },
	    moonStyle2 () {
	      return {
	        top: parseFloat(this.size)/2 - this.moonSize/2 + 'px',
	      }
	    },
	    moonStyle3 () {
	      return {
	        border: this.moonSize + 'px solid transparent'
	      }
	    }
    }
  };
</script>
