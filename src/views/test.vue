<script setup lang="ts">
const myRef = ref("");

function a(myValue: string) {
  // do someting with myValue
}
a(myRef.value);

function b() {
  myValue = myRef.value;
  // do someting with myValue
}
b()
</script>