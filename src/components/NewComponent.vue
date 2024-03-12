<template>
  <main class="tableData">
      <section>
        <header>
      <input class="searchInput" v-model="searchTerm1" placeholder="search by title" /></header>
        <div class="loading" v-if="loading">Loading...</div>
        <div v-else>
          <table v-if="filteredData.length > 0" border>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredData" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.description }}</td>
              </tr>
            </tbody>
          </table>
          <div class="noData" v-else>No Data Found</div>
        </div>
        <footer class="footer" v-if="filteredData.length > 0">
          <button class="btnPre" @click="prevPage" :disabled="currentPage == 1">Pre</button>
          <span class="currentPage">{{currentPage}}</span>
          <button class="btnNext" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </footer>
      </section>
    </main>
</template>
<script>
import axios from 'axios';
export default {
   data() {
       return{
         itemPerPage: 10,
         data:[],
         currentPage:1,
         searchTerm1:'',
         loading: true ,
       } 
    },
    computed:{
      filteredData(){
        let start = (this.currentPage - 1) * this.itemPerPage;
        let end = start + this.itemPerPage;
        return this.data.filter(item => item.title.toLowerCase().includes(this.searchTerm1.toLowerCase())).slice(start,end);
      },
      totalPages(){
        return Math.ceil(this.data.length / this.itemPerPage);
      },
    },
    methods:{
      fetchData() {
        this.loading = true;
        axios.get('https://dummyjson.com/products').then(res =>{
          this.data = res.data.products;
          this.loading = false; 
        }).catch(error =>{
           console.error('Error fetching data:', error);
           this.loading = false; 
        })
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
    },
    mounted(){
      this.fetchData();    
    }

}
</script>
<style scoped>
.tableData{
  width: 100%;
  height: auto; 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
  padding: 20px;
}

.footer{
   width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  border: 1px solid black;
}

.btnPre, .btnNext {
  background: green;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
}

.searchInput {
  width: 100%; 
  margin-bottom: 10px;
  padding: 10px 0px;
}

.noData{
  width: 100%; 
  display: flex;
  justify-content: center;
 
}
.loading{
  width: 100%; 
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}


@media (max-width: 768px) {
  .tableData, .footer {
    width: 100%; 
    padding: 10px; 
  }

  .searchInput, .btnPre, .btnNext {
    width: 100%; 
    margin: 5px 0; 
  }

  .currentPage {
    margin: 10px; 
  }
}

</style>