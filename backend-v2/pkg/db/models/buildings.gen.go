// // Code generated by gorm.io/gen. DO NOT EDIT.
// // Code generated by gorm.io/gen. DO NOT EDIT.
// // Code generated by gorm.io/gen. DO NOT EDIT.

package models

// import (
// 	"context"

// 	"gorm.io/gorm"
// 	"gorm.io/gorm/clause"
// 	"gorm.io/gorm/schema"

// 	"gorm.io/gen"
// 	"gorm.io/gen/field"

// 	"gorm.io/plugin/dbresolver"

// 	"backed-api/pkg/db/model"
// )

// func newBuilding(db *gorm.DB, opts ...gen.DOOption) building {
// 	_building := building{}

// 	_building.buildingDo.UseDB(db, opts...)
// 	_building.buildingDo.UseModel(&model.Building{})

// 	tableName := _building.buildingDo.TableName()
// 	_building.ALL = field.NewAsterisk(tableName)
// 	_building.ID = field.NewString(tableName, "id")
// 	_building.CategoryCode = field.NewString(tableName, "category_code")
// 	_building.MaterialCode = field.NewString(tableName, "material_code")
// 	_building.Name = field.NewString(tableName, "name")
// 	_building.Size = field.NewString(tableName, "size")
// 	_building.Floors = field.NewInt32(tableName, "floors")
// 	_building.Area = field.NewFloat64(tableName, "area")
// 	_building.Description = field.NewString(tableName, "description")
// 	_building.Bange = field.NewString(tableName, "bange")
// 	_building.Price = field.NewInt32(tableName, "price")
// 	_building.CreatedAt = field.NewTime(tableName, "created_at")
// 	_building.IsActive = field.NewBool(tableName, "is_active")

// 	_building.fillFieldMap()

// 	return _building
// }

// type building struct {
// 	buildingDo

// 	ALL          field.Asterisk
// 	ID           field.String
// 	CategoryCode field.String
// 	MaterialCode field.String
// 	Name         field.String
// 	Size         field.String
// 	Floors       field.Int32
// 	Area         field.Float64
// 	Description  field.String
// 	Bange        field.String
// 	Price        field.Int32
// 	CreatedAt    field.Time
// 	IsActive     field.Bool

// 	fieldMap map[string]field.Expr
// }

// func (b building) Table(newTableName string) *building {
// 	b.buildingDo.UseTable(newTableName)
// 	return b.updateTableName(newTableName)
// }

// func (b building) As(alias string) *building {
// 	b.buildingDo.DO = *(b.buildingDo.As(alias).(*gen.DO))
// 	return b.updateTableName(alias)
// }

// func (b *building) updateTableName(table string) *building {
// 	b.ALL = field.NewAsterisk(table)
// 	b.ID = field.NewString(table, "id")
// 	b.CategoryCode = field.NewString(table, "category_code")
// 	b.MaterialCode = field.NewString(table, "material_code")
// 	b.Name = field.NewString(table, "name")
// 	b.Size = field.NewString(table, "size")
// 	b.Floors = field.NewInt32(table, "floors")
// 	b.Area = field.NewFloat64(table, "area")
// 	b.Description = field.NewString(table, "description")
// 	b.Bange = field.NewString(table, "bange")
// 	b.Price = field.NewInt32(table, "price")
// 	b.CreatedAt = field.NewTime(table, "created_at")
// 	b.IsActive = field.NewBool(table, "is_active")

// 	b.fillFieldMap()

// 	return b
// }

// func (b *building) GetFieldByName(fieldName string) (field.OrderExpr, bool) {
// 	_f, ok := b.fieldMap[fieldName]
// 	if !ok || _f == nil {
// 		return nil, false
// 	}
// 	_oe, ok := _f.(field.OrderExpr)
// 	return _oe, ok
// }

// func (b *building) fillFieldMap() {
// 	b.fieldMap = make(map[string]field.Expr, 12)
// 	b.fieldMap["id"] = b.ID
// 	b.fieldMap["category_code"] = b.CategoryCode
// 	b.fieldMap["material_code"] = b.MaterialCode
// 	b.fieldMap["name"] = b.Name
// 	b.fieldMap["size"] = b.Size
// 	b.fieldMap["floors"] = b.Floors
// 	b.fieldMap["area"] = b.Area
// 	b.fieldMap["description"] = b.Description
// 	b.fieldMap["bange"] = b.Bange
// 	b.fieldMap["price"] = b.Price
// 	b.fieldMap["created_at"] = b.CreatedAt
// 	b.fieldMap["is_active"] = b.IsActive
// }

// func (b building) clone(db *gorm.DB) building {
// 	b.buildingDo.ReplaceConnPool(db.Statement.ConnPool)
// 	return b
// }

// func (b building) replaceDB(db *gorm.DB) building {
// 	b.buildingDo.ReplaceDB(db)
// 	return b
// }

// type buildingDo struct{ gen.DO }

// type IBuildingDo interface {
// 	gen.SubQuery
// 	Debug() IBuildingDo
// 	WithContext(ctx context.Context) IBuildingDo
// 	WithResult(fc func(tx gen.Dao)) gen.ResultInfo
// 	ReplaceDB(db *gorm.DB)
// 	ReadDB() IBuildingDo
// 	WriteDB() IBuildingDo
// 	As(alias string) gen.Dao
// 	Session(config *gorm.Session) IBuildingDo
// 	Columns(cols ...field.Expr) gen.Columns
// 	Clauses(conds ...clause.Expression) IBuildingDo
// 	Not(conds ...gen.Condition) IBuildingDo
// 	Or(conds ...gen.Condition) IBuildingDo
// 	Select(conds ...field.Expr) IBuildingDo
// 	Where(conds ...gen.Condition) IBuildingDo
// 	Order(conds ...field.Expr) IBuildingDo
// 	Distinct(cols ...field.Expr) IBuildingDo
// 	Omit(cols ...field.Expr) IBuildingDo
// 	Join(table schema.Tabler, on ...field.Expr) IBuildingDo
// 	LeftJoin(table schema.Tabler, on ...field.Expr) IBuildingDo
// 	RightJoin(table schema.Tabler, on ...field.Expr) IBuildingDo
// 	Group(cols ...field.Expr) IBuildingDo
// 	Having(conds ...gen.Condition) IBuildingDo
// 	Limit(limit int) IBuildingDo
// 	Offset(offset int) IBuildingDo
// 	Count() (count int64, err error)
// 	Scopes(funcs ...func(gen.Dao) gen.Dao) IBuildingDo
// 	Unscoped() IBuildingDo
// 	Create(values ...*model.Building) error
// 	CreateInBatches(values []*model.Building, batchSize int) error
// 	Save(values ...*model.Building) error
// 	First() (*model.Building, error)
// 	Take() (*model.Building, error)
// 	Last() (*model.Building, error)
// 	Find() ([]*model.Building, error)
// 	FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.Building, err error)
// 	FindInBatches(result *[]*model.Building, batchSize int, fc func(tx gen.Dao, batch int) error) error
// 	Pluck(column field.Expr, dest interface{}) error
// 	Delete(...*model.Building) (info gen.ResultInfo, err error)
// 	Update(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
// 	UpdateSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
// 	Updates(value interface{}) (info gen.ResultInfo, err error)
// 	UpdateColumn(column field.Expr, value interface{}) (info gen.ResultInfo, err error)
// 	UpdateColumnSimple(columns ...field.AssignExpr) (info gen.ResultInfo, err error)
// 	UpdateColumns(value interface{}) (info gen.ResultInfo, err error)
// 	UpdateFrom(q gen.SubQuery) gen.Dao
// 	Attrs(attrs ...field.AssignExpr) IBuildingDo
// 	Assign(attrs ...field.AssignExpr) IBuildingDo
// 	Joins(fields ...field.RelationField) IBuildingDo
// 	Preload(fields ...field.RelationField) IBuildingDo
// 	FirstOrInit() (*model.Building, error)
// 	FirstOrCreate() (*model.Building, error)
// 	FindByPage(offset int, limit int) (result []*model.Building, count int64, err error)
// 	ScanByPage(result interface{}, offset int, limit int) (count int64, err error)
// 	Scan(result interface{}) (err error)
// 	Returning(value interface{}, columns ...string) IBuildingDo
// 	UnderlyingDB() *gorm.DB
// 	schema.Tabler
// }

// func (b buildingDo) Debug() IBuildingDo {
// 	return b.withDO(b.DO.Debug())
// }

// func (b buildingDo) WithContext(ctx context.Context) IBuildingDo {
// 	return b.withDO(b.DO.WithContext(ctx))
// }

// func (b buildingDo) ReadDB() IBuildingDo {
// 	return b.Clauses(dbresolver.Read)
// }

// func (b buildingDo) WriteDB() IBuildingDo {
// 	return b.Clauses(dbresolver.Write)
// }

// func (b buildingDo) Session(config *gorm.Session) IBuildingDo {
// 	return b.withDO(b.DO.Session(config))
// }

// func (b buildingDo) Clauses(conds ...clause.Expression) IBuildingDo {
// 	return b.withDO(b.DO.Clauses(conds...))
// }

// func (b buildingDo) Returning(value interface{}, columns ...string) IBuildingDo {
// 	return b.withDO(b.DO.Returning(value, columns...))
// }

// func (b buildingDo) Not(conds ...gen.Condition) IBuildingDo {
// 	return b.withDO(b.DO.Not(conds...))
// }

// func (b buildingDo) Or(conds ...gen.Condition) IBuildingDo {
// 	return b.withDO(b.DO.Or(conds...))
// }

// func (b buildingDo) Select(conds ...field.Expr) IBuildingDo {
// 	return b.withDO(b.DO.Select(conds...))
// }

// func (b buildingDo) Where(conds ...gen.Condition) IBuildingDo {
// 	return b.withDO(b.DO.Where(conds...))
// }

// func (b buildingDo) Order(conds ...field.Expr) IBuildingDo {
// 	return b.withDO(b.DO.Order(conds...))
// }

// func (b buildingDo) Distinct(cols ...field.Expr) IBuildingDo {
// 	return b.withDO(b.DO.Distinct(cols...))
// }

// func (b buildingDo) Omit(cols ...field.Expr) IBuildingDo {
// 	return b.withDO(b.DO.Omit(cols...))
// }

// func (b buildingDo) Join(table schema.Tabler, on ...field.Expr) IBuildingDo {
// 	return b.withDO(b.DO.Join(table, on...))
// }

// func (b buildingDo) LeftJoin(table schema.Tabler, on ...field.Expr) IBuildingDo {
// 	return b.withDO(b.DO.LeftJoin(table, on...))
// }

// func (b buildingDo) RightJoin(table schema.Tabler, on ...field.Expr) IBuildingDo {
// 	return b.withDO(b.DO.RightJoin(table, on...))
// }

// func (b buildingDo) Group(cols ...field.Expr) IBuildingDo {
// 	return b.withDO(b.DO.Group(cols...))
// }

// func (b buildingDo) Having(conds ...gen.Condition) IBuildingDo {
// 	return b.withDO(b.DO.Having(conds...))
// }

// func (b buildingDo) Limit(limit int) IBuildingDo {
// 	return b.withDO(b.DO.Limit(limit))
// }

// func (b buildingDo) Offset(offset int) IBuildingDo {
// 	return b.withDO(b.DO.Offset(offset))
// }

// func (b buildingDo) Scopes(funcs ...func(gen.Dao) gen.Dao) IBuildingDo {
// 	return b.withDO(b.DO.Scopes(funcs...))
// }

// func (b buildingDo) Unscoped() IBuildingDo {
// 	return b.withDO(b.DO.Unscoped())
// }

// func (b buildingDo) Create(values ...*model.Building) error {
// 	if len(values) == 0 {
// 		return nil
// 	}
// 	return b.DO.Create(values)
// }

// func (b buildingDo) CreateInBatches(values []*model.Building, batchSize int) error {
// 	return b.DO.CreateInBatches(values, batchSize)
// }

// // Save : !!! underlying implementation is different with GORM
// // The method is equivalent to executing the statement: db.Clauses(clause.OnConflict{UpdateAll: true}).Create(values)
// func (b buildingDo) Save(values ...*model.Building) error {
// 	if len(values) == 0 {
// 		return nil
// 	}
// 	return b.DO.Save(values)
// }

// func (b buildingDo) First() (*model.Building, error) {
// 	if result, err := b.DO.First(); err != nil {
// 		return nil, err
// 	} else {
// 		return result.(*model.Building), nil
// 	}
// }

// func (b buildingDo) Take() (*model.Building, error) {
// 	if result, err := b.DO.Take(); err != nil {
// 		return nil, err
// 	} else {
// 		return result.(*model.Building), nil
// 	}
// }

// func (b buildingDo) Last() (*model.Building, error) {
// 	if result, err := b.DO.Last(); err != nil {
// 		return nil, err
// 	} else {
// 		return result.(*model.Building), nil
// 	}
// }

// func (b buildingDo) Find() ([]*model.Building, error) {
// 	result, err := b.DO.Find()
// 	return result.([]*model.Building), err
// }

// func (b buildingDo) FindInBatch(batchSize int, fc func(tx gen.Dao, batch int) error) (results []*model.Building, err error) {
// 	buf := make([]*model.Building, 0, batchSize)
// 	err = b.DO.FindInBatches(&buf, batchSize, func(tx gen.Dao, batch int) error {
// 		defer func() { results = append(results, buf...) }()
// 		return fc(tx, batch)
// 	})
// 	return results, err
// }

// func (b buildingDo) FindInBatches(result *[]*model.Building, batchSize int, fc func(tx gen.Dao, batch int) error) error {
// 	return b.DO.FindInBatches(result, batchSize, fc)
// }

// func (b buildingDo) Attrs(attrs ...field.AssignExpr) IBuildingDo {
// 	return b.withDO(b.DO.Attrs(attrs...))
// }

// func (b buildingDo) Assign(attrs ...field.AssignExpr) IBuildingDo {
// 	return b.withDO(b.DO.Assign(attrs...))
// }

// func (b buildingDo) Joins(fields ...field.RelationField) IBuildingDo {
// 	for _, _f := range fields {
// 		b = *b.withDO(b.DO.Joins(_f))
// 	}
// 	return &b
// }

// func (b buildingDo) Preload(fields ...field.RelationField) IBuildingDo {
// 	for _, _f := range fields {
// 		b = *b.withDO(b.DO.Preload(_f))
// 	}
// 	return &b
// }

// func (b buildingDo) FirstOrInit() (*model.Building, error) {
// 	if result, err := b.DO.FirstOrInit(); err != nil {
// 		return nil, err
// 	} else {
// 		return result.(*model.Building), nil
// 	}
// }

// func (b buildingDo) FirstOrCreate() (*model.Building, error) {
// 	if result, err := b.DO.FirstOrCreate(); err != nil {
// 		return nil, err
// 	} else {
// 		return result.(*model.Building), nil
// 	}
// }

// func (b buildingDo) FindByPage(offset int, limit int) (result []*model.Building, count int64, err error) {
// 	result, err = b.Offset(offset).Limit(limit).Find()
// 	if err != nil {
// 		return
// 	}

// 	if size := len(result); 0 < limit && 0 < size && size < limit {
// 		count = int64(size + offset)
// 		return
// 	}

// 	count, err = b.Offset(-1).Limit(-1).Count()
// 	return
// }

// func (b buildingDo) ScanByPage(result interface{}, offset int, limit int) (count int64, err error) {
// 	count, err = b.Count()
// 	if err != nil {
// 		return
// 	}

// 	err = b.Offset(offset).Limit(limit).Scan(result)
// 	return
// }

// func (b buildingDo) Scan(result interface{}) (err error) {
// 	return b.DO.Scan(result)
// }

// func (b buildingDo) Delete(models ...*model.Building) (result gen.ResultInfo, err error) {
// 	return b.DO.Delete(models)
// }

// func (b *buildingDo) withDO(do gen.Dao) *buildingDo {
// 	b.DO = *do.(*gen.DO)
// 	return b
// }