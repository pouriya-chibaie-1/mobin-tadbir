    export const handleDownload = (fileUrl:string) => {
        console.log("fileUrl",fileUrl);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = 'sample.xlsx';
      link.click();
    };