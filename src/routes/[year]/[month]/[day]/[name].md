<script context="module">
	export async function load({ page, fetch, session }) {
    console.log(page.params);
		return {
      props: {
        params: page.params
      }
    };
	}
</script>
<script>
export let params;
</script>

{JSON.stringify(params)}