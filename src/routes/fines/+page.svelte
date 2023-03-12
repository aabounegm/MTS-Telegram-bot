<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    let user = JSON.parse(data.user);
</script>

<h1>Fines</h1>
<span>Email: {user.email}</span>
