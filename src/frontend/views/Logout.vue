<script>
export default {
  created() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    this.$router.push({ name: 'Login' });
  },
};
</script>
