import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITreeOptions, TreeComponent } from '@circlon/angular-tree-component';
import { ITreeNode } from '@circlon/angular-tree-component/lib/defs/api';
import { matDialogConfig } from 'src/app/shared/configs';
import { PERMISSIONS } from 'src/app/shared/data';
import { ProductCategoryDTO, ProductCategoryViewDTO } from 'src/app/shared/dto/product-category.dto';
import { Permissions } from 'src/app/shared/interfaces';
import { SearchParams, TreeNodeModel } from 'src/app/shared/models';
import { ProductCategoryService } from 'src/app/shared/services';
import { TreeUtilities } from 'src/app/shared/utilities';
import { ProductCategoryAddComponent } from '../product-category-add/product-category-add.component';
import { ProductCategoryEditComponent } from '../product-category-edit/product-category-edit.component';

@Component({
  selector: 'era-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {
  constructor(private productCategoryService: ProductCategoryService,
    private dialog: MatDialog) { }

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  permissions: Permissions = PERMISSIONS;

  ngOnInit(): void {
    this.getData();
  }

  productCategories: ProductCategoryViewDTO[] = [];
  nodes: TreeNodeModel[] = [];
  options: ITreeOptions = {
    allowDrag: true,
    allowDrop: true,
  };
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
    this.searchParams = new SearchParams();
    this.searchParams.pageSize = 100;
    return this.searchParams;
  }

  openAdd(id: string | null): void {
    const dialogRef = this.dialog.open(ProductCategoryAddComponent, { ...matDialogConfig, data: { parentId: id } });
    const sub = dialogRef.afterClosed().subscribe((result: ProductCategoryViewDTO | null) => {
      if (result) {
        this.addProductCategoryLocal(result);
        this.addNode(TreeUtilities.mapToTreeNode(result), id);
      }
    });
  }

  addProductCategoryLocal(productCategory: ProductCategoryViewDTO) {
    this.productCategories.push(productCategory);
  }

  addNode(node: TreeNodeModel, parentId: string | null): void {
    if (parentId) {
      const parentNode: TreeNodeModel = TreeUtilities.findNode(this.nodes, parentId);
      parentNode.children.push(node);
    } else {
      this.nodes.push(node);
    }
    this.tree.treeModel.update();

    if (this.tree.treeModel.getFocusedNode()) {
      this.tree.treeModel.getFocusedNode().expand();
    }
  }

  openEdit(node: TreeNodeModel): void {
    let productCategory = this.productCategories.find(i => i.id === node.id);
    const dialogRef = this.dialog.open(ProductCategoryEditComponent, { ...matDialogConfig, data: productCategory });
    const sub = dialogRef.afterClosed().subscribe((result: ProductCategoryViewDTO) => {
      if (result) {
        this.editProductCategoryLocal(result);
        this.editNode(result);
      }
    });
  }

  editProductCategoryLocal(productCategory: ProductCategoryViewDTO) {
    let editedProductCategory = this.productCategories.find(pc => pc.id === productCategory.id) as ProductCategoryViewDTO;
    editedProductCategory.title = productCategory.title;
    editedProductCategory.parentId = productCategory.parentId;
  }

  editNode(productCategory: ProductCategoryViewDTO) {
    let node = TreeUtilities.findNode(this.nodes, productCategory.id);
    node.name = productCategory.title;
    this.tree.treeModel.update();
  }

  deleteNode(node: TreeNodeModel): void {
    this.productCategoryService.delete(node.id).subscribe(result => {
      this.nodes = TreeUtilities.removeNode(this.nodes, node);
      this.tree.treeModel.update();
    });
  }

  nodeMoved(event: any): void {
    const productCategory: ProductCategoryDTO = {
      id: event.node.id,
      title: event.node.name,
      parentId: event.to.parent.virtual ? null : event.to.parent.id
    }

    this.productCategoryService.update(productCategory).subscribe(result => {
      let editedProductCategory = this.productCategories.find(pc => pc.id === result.id) as ProductCategoryViewDTO;
      editedProductCategory.parentId = productCategory.parentId;
    });
  }

  clickOnNode(node: ITreeNode): void {
    if (node && node.isExpanded) {
      node.collapse();
    } else {
      node.expand();
    }
  }
}
