#include <stdio.h>
#include <stdlib.h>

int main(){
    FILE* fptr;

    int resolution_factor = 3;
    int image_width = 16 * resolution_factor;
    int image_height = 9 * resolution_factor;

    if((fptr = fopen("public/image.json", "w+")) == NULL){
        printf("File creation failed");
        return 1;
    }

    fprintf(fptr, "{\n    \"Image\" : [\n");

    for(int i = 0; i < image_height * image_width; i++){
        fprintf(fptr, "        {\n");
        fprintf(fptr, "            \"id\": %d,\n", i + 1);
        fprintf(fptr, "            \"red\": 0,\n");
        fprintf(fptr, "            \"green\": 0,\n");
        fprintf(fptr, "            \"blue\": 0\n");
        if(i != image_height*image_width - 1)
        fprintf(fptr, "        },\n");
        else
        fprintf(fptr, "        }\n");
    }

    fprintf(fptr, "    ]\n");
    fprintf(fptr, "}");

}