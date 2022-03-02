
// data
const products = [
	{
		id: 1,
		description: 'Quarz Luxe',
		price: 1200,
		img: 'assets/img/quarz-luxe.JPG',
	},
	{
		id: 2,
		description: 'Curren Business',
		price: 2000,
		img: 'assets/img/curren-business.JPG',
	},
	{
		id: 3,
		description: 'Curren Sport',
		price: 500,
		img: 'assets/img/curren-sport.JPG',
	},
	{
		id: 4,
		description: 'Jaragar Racing',
		price: 800,
		img: 'assets/img/jaragar-racing.JPG',
	},
	{
		id: 5,
		description: 'Liges Hommes',
		price: 300,
		img: 'assets/img/liges-hommes.JPG',
	},
	{
		id: 6,
		description: 'Maserati Mechanical',
		price: 650,
		img: 'assets/img/maserati-mechanical.JPG',
	},
	{
		id: 7,
		description: 'Montre Mecanique',
		price: 2500,
		img: 'assets/img/montre-mecanique.JPG',
	},
	{
		id: 8,
		description: 'Brand Designer',
		price: 2800,
		img: 'assets/img/brand-designer.JPG',
	},
	{
		id: 9,
		description: 'Relogio Masculino',
		price: 400,
		img: 'assets/img/relogio-masculino.JPG',
	},
	{
		id: 10,
		description: 'Tissot Multifunction',
		price: 290,
		img: 'assets/img/tissot-multifunction.JPG',
	},
	{
		id: 11,
		description: 'Hip Hop Gold',
		price: 870,
		img: 'assets/img/hiphop-gold.JPG',
	},
	{
		id: 12,
		description: 'Mesh Genova',
		price: 600,
		img: 'assets/img/mesh-genova.JPG',
	},
];

const Home = {
	template: '#home',
	data: () => {
		return {
			products,
			searchKey: '',
			liked: [],
      cart: []
		};
	},
	computed: {
		filteredList() {
			return this.products.filter(product => {
				return product.description
					.toLowerCase()
					.includes(this.searchKey.toLowerCase());
			});
		},
		getLikeCookie() {
			let cookieValue = JSON.parse(Cookies.get('like'));
			cookieValue == null ? (this.liked = []) : (this.liked = cookieValue);
		},
    cartTotalAmount(){
      let total = 0;
      for (let item in this.cart){
        total = total + (this.cart[item].quantity * this.cart[item].price)
      }
      return total;
    },
    itemTotalAmount(){
      let itemTotal = 0;
      for (let item in this.cart){
        itemTotal = itemTotal + (this.cart[item].quantity)
      }
      return itemTotal;
    }
	},
	methods: {
		setLikeCookie() {
			document.addEventListener('input', () => {
				setTimeout(() => {
					Cookies.set('like', JSON.stringify(this.liked));
				}, 300);
			});
		},
    addToCart(product){
      // check if already array
      for (let i=0; i < this.cart.length; i++){
        if (this.cart[i].id === product.id) {
          return this.cart[i].quantity++
        }
      }
      this.cart.push({
        id: product.id,
        img: product.img,
        description: product.description,
        price: product.price,
        quantity: 1
      })
    },
    cartPlusOne(product){
      product.quantity = product.quantity + 1;
    },
    cartMinusOne(product,id){
      if (product.quantity == 1){
        this.cartRemoveItem(id);
      } else {
        product.quantity = product.quantity - 1
      }
    },
    cartRemoveItem(id){
      this.list.splice(id, 1);    }
	},
    mounted: () => {
      this.getLikeCookie;
    },
};
const UserSettings = { template: '<h1>UserSettings</h1>' };
const WishList = { template: '<h1>WishList</h1>' };
const ShoppingCart = { template: '<h1>ShoppingCart</h1>' };

const routes = [
	{ path: '/', component: Home },
	{ path: '/user-settings', component: UserSettings },
	{ path: '/wish-list', component: WishList },
	{ path: '/shopping-cart', component: ShoppingCart },
];

const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	routes,
});

const app = Vue.createApp({});

app.use(router);

app.mount('#app');
