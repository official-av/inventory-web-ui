import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-xlsx-reader',
  templateUrl: './xlsx-reader.component.html',
  styleUrls: ['./xlsx-reader.component.css']
})
export class XlsxReaderComponent implements OnInit {
  @ViewChild('btnFile', {static: false}) fileInput;

  file: any;
  xlsData = [[], []] as string[][];
  inputFile: any;
  @Input() acceptedFileType = '.xls,.xlsx,.csv,.txt';
  @Input() content = 'Select File';
  @Output() sendData = new EventEmitter<{ data: string[][], file: any }>();

  constructor() {
  }

  ngOnInit() {
  }

  onFileChange(evt: any) {
    const target = evt.target;
    if (target.value) {
      this.file = target;
      /* wire up file reader */
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // read workbook from file binary string
        const binString = e.target.result as string;
        const xlWorkBook = XLSX.read(binString, {type: 'binary'}) as XLSX.WorkBook;

        // grab first sheet
        const wsName: string = xlWorkBook.SheetNames[0];
        const firstWorkSheet: XLSX.WorkSheet = xlWorkBook.Sheets[wsName];

        // parse and save data as string[][]
        this.xlsData = (XLSX.utils.sheet_to_json(firstWorkSheet, {header: 1})) as string[][];
        const CSVFileData = (XLSX.utils.sheet_to_csv(firstWorkSheet, {strip: true}));
        const csvFile = new Blob([CSVFileData], {type: 'text/csv'});
        const uploadFileData = {
          name: target.files[0].name,
          fileData: csvFile
        };
        this.sendData.emit({data: this.xlsData, file: uploadFileData});

      };
      reader.readAsBinaryString(target.files[0]);
    }
  }

  handleImportButtonClick() {
    this.fileInput.nativeElement.value = '';
    this.fileInput.nativeElement.click();
  }

  public reset() {
    this.file = null;
    this.xlsData = [[], []] as string[][];
  }

  /*export(): void {
    /!* generate worksheet *!/
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.xlsData);

    /!* generate workbook and add the worksheet *!/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /!* save to file *!/
    XLSX.writeFile(wb, this.fileName);
  }*/

}
