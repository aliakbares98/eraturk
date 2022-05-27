import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ITreeOptions, TreeComponent } from '@circlon/angular-tree-component';
import { ITreeNode } from '@circlon/angular-tree-component/lib/defs/api';
import { ProductCategoryViewDTO } from 'src/app/shared/dto';
import { SearchParams, TreeNodeModel } from 'src/app/shared/models';
import { ProductCategoryService } from 'src/app/shared/services';
import { TreeUtilities } from 'src/app/shared/utilities';

@Component({
  selector: 'era-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.scss']
})
export class SelectCategoryComponent implements OnInit {

  constructor(private productCategoryService: ProductCategoryService,
    private dialogRef: MatDialogRef<SelectCategoryComponent>) { }


  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  ngOnInit(): void {
    this.getData();
  }

  productCategories: ProductCategoryViewDTO[] = [];
  nodes: TreeNodeModel[] = [];
  options: ITreeOptions = {};

  getData() {
    this.productCategoryService.getAll<ProductCategoryViewDTO>(this.getSearchParams()).subscribe(result => {
      this.productCategories = result.items;
      this.nodes = TreeUtilities.makeTree(this.productCategories);
    });
  }

  searchParams: SearchParams;
  getSearchParams(): string {
    return this.searchParams ? this.searchParams.stringify() : this.initialSearchParams().stringify();
  }

  initialSearchParams(): SearchParams {
    const params = new SearchParams();
    params.pageSize = 100;
    return params;
  }

  onFocus({ eventName, node }: { eventName: string, node: ITreeNode }): void {
    if (!node.hasChildren) {
      this.dialogRef.close(this.productCategories.find(pc => pc.id === node.id));
    }
  }

  clickOnNode(node: ITreeNode) : void{
    if (node && node.isExpanded) {
      node.collapse();
    } else {
      node?.expand();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
