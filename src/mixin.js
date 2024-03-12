

export const myMixin ={
   data() {
       return {
        mixinData: 'This data is from the mixin'
      };
    },

    methods: {
      mixinMethod() {
        console.log('This method is from the mixin');
      }
    },
    created() {
      console.log('Mixin created hook');
    }
  }; 
    
