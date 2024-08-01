<script lang="ts">
	export let userId: number;
</script>

<h3 class="text-xl font-semibold mb-4">Edit profile picture</h3>

<form
	action={`/profile/${userId}?/avatar`}
	method="POST"
	class="pointer-events-auto"
	enctype="multipart/form-data"
>
	<input type="file" name="image" accept="image/*" required class="file-input" />
	<button type="submit" class="btn pointer-events-auto">Upload</button>
</form>
